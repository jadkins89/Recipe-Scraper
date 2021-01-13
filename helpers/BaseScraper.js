"use strict";

const fetch = require("node-fetch");
const cheerio = require("cheerio");

const RecipeSchema = require("./recipe-schema");

/**
 *
 */
class BaseScraper {
  constructor(url, subUrl = "") {
    this.url = url;
    this.subUrl = subUrl;
  }

  /**
   *
   */
  checkUrl() {
    if (!this.url.includes(this.subUrl)) {
      throw new Error(`url provided must include '${this.subUrl}'`);
    }
  }

  createRecipeObject() {
    this.recipe = new RecipeSchema();
  }

  /**
   *
   */
  defaultSetImage($) {
    this.recipe.image = $("meta[property='og:image']").attr("content");
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
      throw new Error("No recide found on page");
    }
  }

  /**
   *
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

  /**
   *
   */
  // TODO build recipe schema
  validateRecipe() {
    if (
      !this.recipe.name ||
      !this.recipe.ingredients.length ||
      !this.recipe.instructions.length
    ) {
      throw new Error("No recipe found on page");
    }
    return this.recipe;
  }
}

module.exports = BaseScraper;
