"use strict";

const fetch = require("node-fetch");
const cheerio = require("cheerio");
const {validate} = require("jsonschema");

const Recipe = require("./Recipe");
const recipeSchema = require("./RecipeSchema.json");

/**
 * Abstract Class which all scrapers inherit from
 */
class BaseScraper {
  constructor(url, subUrl = "") {
    this.url = url;
    this.subUrl = subUrl;
  }

  async checkServerResponse() {
    try {
      const res = await fetch(this.url);

      return res.ok; // res.status >= 200 && res.status < 300
    } catch (e) {
      console.log(e)
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
            const recipe = JSON.parse(jsonRaw);

            if (recipe['@type'] === 'Recipe') {
              // console.log('found a Recipe type json schema!');
              // console.log(recipe)
              try {
                // name
                this.recipe.name = BaseScraper.HtmlDecode($, recipe.name);

                // description
                this.recipe.description = recipe.description ? BaseScraper.HtmlDecode($, recipe.description) : this.defaultSetDescription($);

                // image
                if (recipe.image) {
                  if (recipe.image["@type"] === "ImageObject" && recipe.url) {
                    this.recipe.image = recipe.image.url;
                  } else if (typeof recipe.image === "string") {
                    this.recipe.image = recipe.image;
                  } else if (Array.isArray(recipe.image)) {
                    this.recipe.image = recipe.image[0];
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
                  recipe.recipeInstructions.forEach(step => {
                    if (step["@type"] === "HowToStep") {
                      this.recipe.instructions.push(BaseScraper.HtmlDecode($, step.text));
                      this.recipe.sectionedInstructions.push({
                        sectionTitle: step.name || '',
                        text: BaseScraper.HtmlDecode($, step.text),
                        image: step.image || ''
                      })
                    } else if (typeof step === "string") {
                      this.recipe.instructions.push(BaseScraper.HtmlDecode($, step));
                    }
                  });
                } else if (typeof recipe.recipeInstructions === "string") {
                  this.recipe.instructions = [BaseScraper.HtmlDecode($, recipe.recipeInstructions.replace(/\n/g, ""))]
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
                this.recipe.servings = recipe.recipeYield;

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
      const res = await fetch(this.url);
      const html = await res.text();
      return cheerio.load(html);
    } catch (err) {
      this.defaultError();
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
      this.createRecipeObject();
      this.scrape($);
    } catch (e) {
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
    if (s && typeof s === "string") s.replace(/amp;/gm, '');
    return $('<div>').html(s).text();
  }

  /**
   * Validates scraped recipes against defined recipe schema
   * @returns {object} - an object representing the recipe
   */
  validateRecipe() {
    let res = validate(this.recipe, recipeSchema);
    if (!res.valid) {
      this.defaultError();
    }
    return this.recipe;
  }

  static parsePTTime(ptTime) {
    ptTime = ptTime.replace('PT', '');
    ptTime = ptTime.replace('H', ' hours ');
    ptTime = ptTime.replace('M', ' minutes ');
    ptTime = ptTime.replace('S', ' seconds');

    return ptTime.trim();
  }
}

module.exports = BaseScraper;
