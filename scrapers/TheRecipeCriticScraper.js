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
    this.defaultSetDescription($);
    const { ingredients, instructions, time } = this.recipe;
    this.recipe.name = this.textTrim($(".wprm-recipe-name"));

    $(".wprm-recipe-ingredient").each((i, el) => {
        el = $(el).remove('.wprm-checkbox-container');
      ingredients.push(this.textTrim($(el)).replace(/\s\s+/g, " ").replace(/▢/g, "").trim());
    });

    $(".wprm-recipe-instruction-text").each((i, el) => {
      instructions.push(this.textTrim($(el)).replace(/\s\s+/g, " "));
    });

    $(".wprm-recipe-details-name").remove();

    time.prep = this.textTrim($(".wprm-recipe-prep-time-container .wprm-recipe-time"));
    time.cook = this.textTrim($(".wprm-recipe-cook-time-container .wprm-recipe-time"));
    time.inactive = this.textTrim($(".wprm-recipe-custom-time-container"));
    time.total = this.textTrim($(".wprm-recipe-total-time-container .wprm-recipe-time"));
    this.recipe.servings = $(
      ".wprm-recipe-servings-container .wprm-recipe-servings"
    ).text();
  }
}

module.exports = TheRecipeCriticScraper;
