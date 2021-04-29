"use strict";

const BaseScraper = require("../helpers/BaseScraper");

/**
 * Class for scraping food.com
 * @extends BaseScraper
 */
class FoodScraper extends BaseScraper {
  constructor(url) {
    super(url, "food.com/recipe/");
  }

  scrape($) {
    this.defaultSetImage($);
    this.defaultSetDescription($);
    const { ingredients, instructions, time } = this.recipe;
    this.recipe.name = $(".recipe-title").text();

    $(".recipe-ingredients__item").each((i, el) => {
      const item = $(el)
        .text()
        .replace(/\s\s+/g, " ")
        .trim();
      ingredients.push(item);
    });

    $(".recipe-directions__step").each((i, el) => {
      const step = $(el)
        .text()
        .replace(/\s\s+/g, "");
      instructions.push(step);
    });

    time.total = $(".recipe-facts__time")
      .children()
      .last()
      .text();
  }
}

module.exports = FoodScraper;
