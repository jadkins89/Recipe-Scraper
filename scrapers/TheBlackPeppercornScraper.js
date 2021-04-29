"use strict";

const BaseScraper = require("../helpers/BaseScraper");

/**
 * Class for scraping theblackpeppercorn.com
 * @extends BaseScraper
 */
class TheBlackPeppercornScraper extends BaseScraper {
  constructor(url) {
    super(url, "theblackpeppercorn.com/");
  }

  scrape($) {
    this.defaultSetImage($);
    this.defaultSetDescription($);
    const { ingredients, instructions, time } = this.recipe;
    this.recipe.name = this.textTrim($(".wprm-recipe-name"));

    $(".wprm-recipe-ingredients > .wprm-recipe-ingredient").each((i, el) => {
      ingredients.push(
        $(el)
          .text()
          .replace(/(▢)/g, "")
          .replace(" ,", ",")
      );
    });

    $(".wprm-recipe-instruction-text").each((i, el) => {
      instructions.push(
        $(el)
          .remove("img")
          .text()
          .replace(/\s\s+/g, "")
      );
    });

    time.prep = $(".wprm-recipe-prep-time-label")
      .next()
      .text();
    time.cook = $(".wprm-recipe-cook-time-label")
      .next()
      .text();
    time.inactive = $(".wprm-recipe-custom-time-label")
      .next()
      .text();
    time.total = $(".wprm-recipe-total-time-label")
      .next()
      .text();
    this.recipe.servings = $(".wprm-recipe-servings").text();
  }
}

module.exports = TheBlackPeppercornScraper;
