"use strict";

const fetch = require("node-fetch");
const cheerio = require("cheerio");

const RecipeSchema = require("./RecipeSchema");

/**
 * Abstract Class which all scrapers inherit from
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

  defaultError() {
    throw new Error("No recipe found on page");
  }

  /**
   *
   */
  defaultSetImage($) {
    this.recipe.image =
      $("meta[property='og:image']").attr("content") ||
      $("meta[name='og:image']").attr("content");
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
      this.defaultError();
    }
    return this.recipe;
  }
}

module.exports = BaseScraper;
