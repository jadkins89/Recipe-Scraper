"use strict";

const BaseScraper = require("../helpers/BaseScraper");

/**
 * Class for scraping julieblanner.com
 * @extends BaseScraper
 */
class JulieBlannerScraper extends BaseScraper {
  constructor(url) {
    super(url, "julieblanner.com/");
  }

  scrape($) {
    this.defaultSetImage($);
    this.defaultSetDescription($);
    const { ingredients, instructions, time } = this.recipe;
    this.recipe.name = $(".wprm-recipe-name")
      .text()
      .trim();

    $(".wprm-recipe-ingredients > .wprm-recipe-ingredient").each((i, el) => {
      ingredients.push(
        $(el)
          .text()
          .replace(/(\s\s+|▢)/g, " ")
          .trim()
      );
    });

    $(".wprm-recipe-instruction-text").each((i, el) => {
      instructions.push(
        $(el)
          .remove("img")
          .text()
          .trim()
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

module.exports = JulieBlannerScraper;
