"use strict";

const BaseScraper = require("../helpers/BaseScraper");

/**
 * Class for scraping gimmedelicious.com
 * @extends BaseScraper
 */
class GimmeDeliciousScraper extends BaseScraper {
  constructor(url) {
    super(url, "gimmedelicious.com/");
  }

  scrape($) {
    this.defaultSetImage($);
    this.recipe.description = this.textTrim($('.entry-content em').first());
    const { ingredients, instructions, time } = this.recipe;
    this.recipe.name = this.textTrim($(".wprm-recipe-name"));

    this.recipe.tags = ($("meta[name='keywords']").attr("content") || "").split(
      ","
    );

    $(".wprm-recipe-ingredients > .wprm-recipe-ingredient").each((i, el) => {
      ingredients.push(
        $(el)
          .text()
          .replace(/▢/g, "")
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

    time.prep =
      $(".wprm-recipe-prep_time-minutes").text() +
      " " +
      $(".wprm-recipe-prep_timeunit-minutes").text();
    time.cook =
      $(".wprm-recipe-cook_time-minutes").text() +
      " " +
      $(".wprm-recipe-cook_timeunit-minutes").text();
    time.total =
      $(".wprm-recipe-total_time-minutes").text() +
      " " +
      $(".wprm-recipe-total_timeunit-minutes").text();
    this.recipe.servings = $(".wprm-recipe-servings").text();
  }
}

module.exports = GimmeDeliciousScraper;
