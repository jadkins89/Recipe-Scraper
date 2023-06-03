"use strict";

import fetch from 'node-fetch';
import cheerio from 'cheerio';
import { validate } from 'jsonschema';
import Recipe from './Recipe.js';
import * as fs from "fs";

// Read the JSON file
const jsonData = fs.readFileSync("src/helpers/RecipeSchema.json", "utf-8");

// Parse the JSON data
const recipeSchema = JSON.parse(jsonData);

function getFirstImage(image) {
  let result = image || "";
  if(Array.isArray(image) && image.length > 0) {
    if(image[0]["@type"] === "ImageObject") {
      result = image[0]["url"];
    }
  }

  return result;
}

/**
 * Abstract Class which all scrapers inherit from
 */
class BaseScraper {
  constructor(url, subUrl = "") {
    this.url = url;
    this.subUrl = subUrl;
    this.status = null;
  }

  async checkServerResponse() {
    try {
      const res = await fetch(this.url);

      return res.ok; // res.status >= 200 && res.status < 300
    } catch (e) {
      // console.log(e)
      return false;
    }
  }

  /**
   * Checks if the url has the required sub url
   */
  checkUrl() {
    if (!this.url.includes(this.subUrl)) {
      throw new Error(`url provided must include '${this.subUrl}'`);
    }
  }

  /**
   * Builds a new instance of Recipe
   */
  createRecipeObject() {
    this.recipe = new Recipe();
  }

  defaultError() {
    throw new Error("No recipe found on page");
  }

  /**
   * look for LD+JOSN script in the web page.
   * @param {object} $ - a cheerio object representing a DOM
   * @returns {boolean} - if exist, set recipe data and return true, else - return false.
   */
  defaultLD_JOSN($) {
    const jsonLDs = Object.values($("script[type='application/ld+json']"));
    let isRecipeSchemaFound = false;

    jsonLDs.forEach(jsonLD => {
      if (jsonLD && jsonLD.children && Array.isArray(jsonLD.children)) {
        jsonLD.children.forEach(el => {
          if (el.data) {

            const jsonRaw = el.data;
            const result = JSON.parse(jsonRaw);
            let recipe;

            if(Array.isArray(result)) {
              result.forEach(r => {
                if ((Array.isArray(r['@type']) && r['@type'].includes('Recipe')) ||
                  r['@type'] === 'Recipe') {
                  recipe = r;
                }
              })
            }

            if (result['@graph'] && Array.isArray(result['@graph'])) {
              result['@graph'].forEach(g => {
                if (g['@type'] === 'Recipe') {
                  recipe = g;
                }
              })
            }

            if ((Array.isArray(result['@type']) && result['@type'].includes('Recipe')) ||
              result['@type'] === 'Recipe') {
              recipe = result;
            }

            if (recipe) {
              console.log('found a Recipe type json schema!');
              // console.log(recipe)
              try {
                // name
                this.recipe.name = BaseScraper.HtmlDecode($, recipe.name);

                // description
                if (recipe.description) {
                  this.recipe.description = BaseScraper.HtmlDecode($, recipe.description);
                } else {
                  this.defaultSetDescription($);
                }

                // image
                if (Array.isArray(recipe.image)) {
                  recipe.image = recipe.image[0];
                }

                if (recipe.image) {
                  if (recipe.image["@type"] === "ImageObject" && recipe.image.url) {
                    this.recipe.image = recipe.image.url;
                  } else if (typeof recipe.image === "string") {
                    this.recipe.image = recipe.image;
                  }
                } else {
                  this.defaultSetImage($);
                }


                // tags
                this.recipe.tags = [];
                if (recipe.keywords) {
                  if (typeof recipe.keywords === "string") {
                    this.recipe.tags = [...recipe.keywords.split(',')]
                  } else if (Array.isArray(recipe.keywords)) {
                    this.recipe.tags = [...recipe.keywords]
                  }
                }

                if (recipe.recipeCuisine) {
                  if (typeof recipe.recipeCuisine === "string") {
                    this.recipe.tags.push(recipe.recipeCuisine)
                  } else if (Array.isArray(recipe.recipeCuisine)) {
                    this.recipe.tags = [...new Set([...this.recipe.tags, ...recipe.recipeCuisine])]
                  }
                }

                if (recipe.recipeCategory) {
                  if (typeof recipe.recipeCategory === "string") {
                    this.recipe.tags.push(recipe.recipeCategory)
                  } else if (Array.isArray(recipe.recipeCategory)) {
                    this.recipe.tags = [...new Set([...this.recipe.tags, ...recipe.recipeCategory])]
                  }
                }

                this.recipe.tags = this.recipe.tags.map(i => BaseScraper.HtmlDecode($, i));
                this.recipe.tags = [...new Set(this.recipe.tags)];

                // ingredients
                if (Array.isArray(recipe.recipeIngredient)) {
                  this.recipe.ingredients = recipe.recipeIngredient.map(i => BaseScraper.HtmlDecode($, i));
                } else if (typeof recipe.recipeIngredient === "string") {
                  this.recipe.ingredients = recipe.recipeIngredient.split(",").map(i => BaseScraper.HtmlDecode($, i.trim()));
                }

                // instructions (may be string, array of strings, or object of sectioned instructions)
                this.recipe.instructions = [];
                this.recipe.sectionedInstructions = [];

                if (recipe.recipeInstructions &&
                  recipe.recipeInstructions["@type"] === "ItemList" &&
                  recipe.recipeInstructions.itemListElement) {

                  recipe.recipeInstructions.itemListElement.forEach(section => {
                    this.recipe.instructions = [
                      ...this.recipe.instructions,
                      ...section.itemListElement.map(i => BaseScraper.HtmlDecode($, i.text))
                    ];
                    section.itemListElement.forEach(i => {
                      this.recipe.sectionedInstructions.push({
                        sectionTitle: section.name,
                        text: BaseScraper.HtmlDecode($, i.text),
                        image: i.image || ''
                      })
                    });
                  });
                } else if (Array.isArray(recipe.recipeInstructions)) {
                  recipe.recipeInstructions.forEach(instructionStep => {
                    if (instructionStep["@type"] === "HowToStep") {
                      this.recipe.instructions.push(BaseScraper.HtmlDecode($, instructionStep.text));
                      this.recipe.sectionedInstructions.push({
                        sectionTitle: instructionStep.name || '',
                        text: BaseScraper.HtmlDecode($, instructionStep.text),
                        image: getFirstImage(instructionStep.image)
                      })
                    } else if (instructionStep["@type"] === "HowToSection") {
                      if (instructionStep.itemListElement) {
                        instructionStep.itemListElement.forEach(step => {
                          this.recipe.instructions.push(BaseScraper.HtmlDecode($, step.text));

                          this.recipe.sectionedInstructions.push({
                            sectionTitle: instructionStep.name,
                            text: BaseScraper.HtmlDecode($, step.text),
                            image: getFirstImage(step.image)
                          })
                        });
                      }
                    } else if (typeof instructionStep === "string") {
                      this.recipe.instructions.push(BaseScraper.HtmlDecode($, instructionStep));
                    }
                  });
                } else if (typeof recipe.recipeInstructions === "string") {
                  this.recipe.instructions = [BaseScraper.HtmlDecode($, recipe.recipeInstructions)]
                }

                // prep time
                if (recipe.prepTime) {
                  this.recipe.time.prep = BaseScraper.parsePTTime(recipe.prepTime);
                }

                // cook time
                if (recipe.cookTime) {
                  this.recipe.time.cook = BaseScraper.parsePTTime(recipe.cookTime);
                }

                // total time
                if (recipe.totalTime) {
                  this.recipe.time.total = BaseScraper.parsePTTime(recipe.totalTime);
                }

                // servings
                if (Array.isArray(recipe.recipeYield)) {
                  this.recipe.servings = recipe.recipeYield[0];
                } else if (typeof recipe.recipeYield === "string") {
                  this.recipe.servings = recipe.recipeYield;
                }

                isRecipeSchemaFound = true;
              } catch (e) {
                console.log(e);
              }
            }
          }
        });
      }
    });

    return isRecipeSchemaFound;
  }

  /**
   * @param {object} $ - a cheerio object representing a DOM
   * @returns {string|null} - if found, an image url
   */
  defaultSetImage($) {
    this.recipe.image =
      $("meta[property='og:image']").attr("content") ||
      $("meta[name='og:image']").attr("content") ||
      $("meta[itemprop='image']").attr("content");
  }

  /**
   * @param {object} $ - a cheerio object representing a DOM
   * if found, set recipe name
   */
  defaultSetName($) {
    let title =
      $("meta[name='title']").attr("content") ||
      $("meta[property='og:title']").attr("content") ||
      $("meta[name='twitter:title']").attr("content");

    title = title.split('|')[0];

    this.recipe.name = title ? title.trim() : '';
  }

  /**
   * @param {object} $ - a cheerio object representing a DOM
   * if found, set recipe description
   */
  defaultSetDescription($) {
    const description =
      $("meta[name='description']").attr("content") ||
      $("meta[property='og:description']").attr("content") ||
      $("meta[name='twitter:description']").attr("content");

    this.recipe.description = description ? description.replace(/\n/g, " ").trim() : '';
  }

  /**
   * Fetches html from url
   * @returns {object} - Cheerio instance
   */
  async fetchDOMModel() {
    try {
      const meta = [
        ['User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/11.1.2 Safari/605.1.15'],
      ];
      const headers = new fetch.Headers(meta);
      const res = await fetch(this.url, {headers});
      const html = await res.text();
      this.status = res.status;

      return cheerio.load(html);
    } catch (err) {
      console.log(err);
      throw err;
      // this.defaultError();
    }
  }

  /**
   * Handles the workflow for fetching a recipe
   * @returns {object} - an object representing the recipe
   */
  async fetchRecipe() {
    this.checkUrl();
    try {
      const $ = await this.fetchDOMModel();
      if (this.status >= 400) {
        // console.error("got status " + this.status);
        this.defaultError();
      }
      this.createRecipeObject();
      this.scrape($);
    } catch (e) {
      // console.error(e);
      this.defaultError();
    }

    return this.validateRecipe();
  }

  /**
   * Abstract method
   * @param {object} $ - cheerio instance
   * @returns {object} - an object representing the recipe
   */
  scrape($) {
    throw new Error("scrape is not defined in BaseScraper");
  }

  textTrim(el) {
    return el.text().trim();
  }

  static HtmlDecode($, s) {
    const res = $('<div>').html(s).text() || "";

    return res.trim()
      .replace(/amp;/gm, '')
      .replace(/(?=\[caption).*?(?<=\[ caption\])/g, '') // removes short-codes [caption.*[ caption]
      .replace(/\n/g, "");
  }

  /**
   * Validates scraped recipes against defined recipe schema
   * @returns {object} - an object representing the recipe
   */
  validateRecipe() {
    let res = validate(this.recipe, recipeSchema);
    if (!res.valid) {
      // res.errors.forEach(error => {
      //   console.log(error.property + ' ' + error.message);
      // });
      this.defaultError();
    }
    return this.recipe;
  }

  static parsePTTime(ptTime) {
    if(!ptTime) return;
    if (ptTime["@type"] === "Duration") {
      ptTime = ptTime["maxValue"];
    }
    ptTime = ptTime.replace('PT', '');
    ptTime = ptTime.replace('H', ' hours ');
    ptTime = ptTime.replace('M', ' minutes ');
    ptTime = ptTime.replace('S', ' seconds');

    return ptTime.trim();
  }
}

export default BaseScraper;
