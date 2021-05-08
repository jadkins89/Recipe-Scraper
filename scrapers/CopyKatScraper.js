"use strict";

const PuppeteerScraper = require("../helpers/PuppeteerScraper");

/**
 * Class for scraping copykat.com
 * @extends PuppeteerScraper
 */
class CopyKatScraper extends PuppeteerScraper {
  constructor(url) {
    super(url, "copykat.com/");
  }

  scrape($) {
    this.defaultSetImage($);
    this.defaultSetDescription($);
    const { ingredients, instructions, time } = this.recipe;
    this.recipe.name = $(
      $(".wprm-recipe-container").find(".wprm-recipe-name")
    ).text();

    $(".wprm-recipe-ingredient").each((i, el) => {
      ingredients.push(
        $(el)
          .text()
          .replace(/\s\s+/g, " ")
          .trim()
      );
    });

    $(".wprm-recipe-instructions").each((i, el) => {
      instructions.push(
        $(el)
          .text()
          .replace(/\s\s+/g, " ")
          .trim()
      );
    });

    time.prep = $(
      $(".wprm-recipe-prep-time-container").children(".wprm-recipe-time")
    ).text();
    time.cook = $(
      $(".wprm-recipe-cook-time-container").children(".wprm-recipe-time")
    ).text();
    time.total = $(
      $(".wprm-recipe-total-time-container").children(".wprm-recipe-time")
    ).text();

    this.recipe.servings = $(".wprm-recipe-servings").text();
  }
}

module.exports = CopyKatScraper;
