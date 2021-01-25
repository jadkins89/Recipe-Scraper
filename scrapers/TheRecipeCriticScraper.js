"use strict";

const BaseScraper = require("../helpers/BaseScraper");

/**
 * Class for scraping therecipecritic.com
 * @extends BaseScraper
 */
class TheRecipeCriticScraper extends BaseScraper {
  constructor(url) {
    super(url, "therecipecritic.com/");
  }

  scrape($) {
    this.defaultSetImage($);
    const { ingredients, instructions, time } = this.recipe;
    this.recipe.name = this.textTrim($(".wprm-recipe-name"));

    $(".wprm-recipe-ingredient").each((i, el) => {
      ingredients.push(this.textTrim($(el)).replace(/\s\s+/g, " "));
    });

    $(".wprm-recipe-instruction-text").each((i, el) => {
      instructions.push(this.textTrim($(el)).replace(/\s\s+/g, " "));
    });

    $(".wprm-recipe-details-name").remove();

    time.prep = this.textTrim($(".wprm-recipe-prep-time-container"));
    time.cook = this.textTrim($(".wprm-recipe-cook-time-container"));
    time.inactive = this.textTrim($(".wprm-recipe-custom-time-container"));
    time.total = this.textTrim($(".wprm-recipe-total-time-container"));
    this.recipe.servings = $(
      ".wprm-recipe-servings-container .wprm-recipe-servings"
    ).text();
  }
}

module.exports = TheRecipeCriticScraper;
