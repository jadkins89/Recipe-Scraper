"use strict";

const BaseScraper = require("../helpers/BaseScraper");

/**
 * Class for scraping foodandwine.com
 * @extends BaseScraper
 */
class FoodAndWineScraper extends BaseScraper {
  constructor(url) {
    super(url, "foodandwine.com/recipes/");
  }

  scrape($) {
    this.defaultSetImage($);
    this.defaultSetDescription($);
    const { ingredients, instructions, time } = this.recipe;
    this.recipe.name = $("h1.headline").text();

    $(".ingredients-section")
      .find(".ingredients-item-name")
      .each((i, el) => {
        ingredients.push(
          $(el)
            .text()
            .trim()
        );
      });

    $(".recipe-instructions")
      .find("p")
      .each((i, el) => {
        instructions.push($(el).text());
      });

    let metaBody = $(".recipe-meta-item-body");

    time.active = metaBody
      .first()
      .text()
      .trim();
    time.total = $(metaBody.get(1))
      .text()
      .trim();

    this.recipe.servings = metaBody
      .last()
      .text()
      .trim();
  }
}

module.exports = FoodAndWineScraper;
