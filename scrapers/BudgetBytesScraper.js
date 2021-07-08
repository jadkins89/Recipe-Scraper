"use strict";

const BaseScraper = require("../helpers/BaseScraper");

/**
 * Class for scraping budgetbytes.com
 * @extends BaseScraper
 */
class BudgetBytesScraper extends BaseScraper {
  constructor(url) {
    super(url, "budgetbytes.com/");
  }

  scrape($) {
    this.defaultSetImage($);
    this.defaultSetDescription($);
    const { ingredients, instructions, time } = this.recipe;
    this.recipe.name = $(".wprm-recipe-name").text();

    $(".wprm-recipe-ingredient-notes").remove();
    $(".wprm-recipe-ingredient").each((i, el) => {
      ingredients.push(
        $(el)
          .text()
          .trim()
      );
    });

    $(".wprm-recipe-instruction-text").each((i, el) => {
      instructions.push($(el).text());
    });

    time.prep = $(".wprm-recipe-prep-time-label")
      .next()
      .text();
    time.cook = $(".wprm-recipe-cook-time-label")
      .next()
      .text();
    time.total = $(".wprm-recipe-total-time-label")
      .next()
      .text();

    this.recipe.servings = $(".wprm-recipe-servings").text();
  }
}

module.exports = BudgetBytesScraper;
