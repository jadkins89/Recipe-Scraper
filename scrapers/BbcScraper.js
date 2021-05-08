"use strict";

const BaseScraper = require("../helpers/BaseScraper");

/**
 * Class for scraping bbc.co
 * @extends BaseScraper
 */
class BbcScraper extends BaseScraper {
  constructor(url) {
    super(url, "bbc.co.uk/food/recipes/");
  }

  scrape($) {
    this.defaultSetImage($);
    this.defaultSetDescription($);
    const { ingredients, instructions, time } = this.recipe;
    this.recipe.name = $(".content-title__text").text();

    $(".recipe-ingredients__list-item").each((i, el) => {
      ingredients.push($(el).text());
    });

    $(".recipe-method__list-item-text").each((i, el) => {
      instructions.push($(el).text());
    });

    time.prep = $(".recipe-metadata__prep-time")
      .first()
      .text();
    time.cook = $(".recipe-metadata__cook-time")
      .first()
      .text();

    this.recipe.servings = $(".recipe-leading-info__side-bar .recipe-metadata__serving")
      .text();
  }
}

module.exports = BbcScraper;
