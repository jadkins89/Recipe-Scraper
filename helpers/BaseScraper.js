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
            const result = JSON.parse(jsonRaw);

            if (result['@type'] === 'Recipe') {
              try {
                // name
                this.recipe.name = BaseScraper.HtmlDecode($, result.name);

                // description
                this.recipe.description = result.description ? BaseScraper.HtmlDecode($, result.description) : this.defaultSetDescription($);

                // image
                this.recipe.image = result.image ? result.image[0] : this.defaultSetImage($);

                // tags
                this.recipe.tags = [];
                if (result.keywords) {
                  if (typeof result.keywords === "string") {
                    this.recipe.tags = [...result.keywords.split(',')]
                  } else if (Array.isArray(result.keywords)) {
                    this.recipe.tags = result.keywords
                  }
                }

                if (result.recipeCuisine) {
                  if (typeof result.recipeCuisine === "string") {
                    this.recipe.tags.push(result.recipeCuisine)
                  } else if (Array.isArray(result.recipeCuisine)) {
                    this.recipe.tags = [...new Set(...this.recipe.tags, ...result.recipeCuisine)]
                  }
                }

                if (result.recipeCategory) {
                  if (typeof result.recipeCategory === "string") {
                    this.recipe.tags.push(result.recipeCategory)
                  } else if (Array.isArray(result.recipeCategory)) {
                    this.recipe.tags = [...new Set([...this.recipe.tags, ...result.recipeCategory])]
                  }
                }

                // ingredients
                this.recipe.ingredients = result.recipeIngredient.map(i => BaseScraper.HtmlDecode($, i));

                // instructions
                if (Array.isArray(result.recipeInstructions)) {
                  this.recipe.instructions = result.recipeInstructions.map(step => {
                    if (step.text) return step.text;
                    else if (typeof step === "string") return BaseScraper.HtmlDecode($, step)
                  });
                } else if (typeof result.recipeInstructions === "string") {
                  this.recipe.instructions = [BaseScraper.HtmlDecode($, result.recipeInstructions)]
                }

                // prep time
                if (result.prepTime) {
                  this.recipe.time.prep = BaseScraper.parsePTTime(result.prepTime);
                }

                // cook time
                if (result.cookTime) {
                  this.recipe.time.cook = BaseScraper.parsePTTime(result.cookTime);
                }

                // total time
                if (result.total) {
                  this.recipe.time.total = BaseScraper.parsePTTime(result.totalTime);
                }

                // servings
                this.recipe.servings = result.recipeYield;

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
    const $ = await this.fetchDOMModel();
    this.createRecipeObject();
    this.scrape($);
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
    ptTime = ptTime.replace('H', ' hours');
    ptTime = ptTime.replace('M', ' minutes');
    ptTime = ptTime.replace('S', ' seconds');

    return ptTime;
  }
}

module.exports = BaseScraper;
