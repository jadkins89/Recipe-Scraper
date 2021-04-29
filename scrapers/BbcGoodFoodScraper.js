"use strict";

const BaseScraper = require("../helpers/BaseScraper");

/**
 * Class for scraping bbcgoodfood.com
 * @extends BaseScraper
 */
class BbcGoodFoodScraper extends BaseScraper {
  constructor(url) {
    super(url, "bbcgoodfood.com/recipes/");
  }

  scrape($) {
    this.defaultSetImage($);
    this.defaultSetDescription($);
    const { ingredients, instructions, time } = this.recipe;
    this.recipe.name = $("meta[name='og:title']").attr("content");

    $(".recipe__ingredients")
      .find("li")
      .each((i, el) => {
        ingredients.push(
          $(el)
            .text()
            .replace(" ,", ",")
        );
      });

    $(".recipe__method-steps")
      .find("p")
      .each((i, el) => {
        instructions.push($(el).text());
      });

    $(".cook-and-prep-time")
      .find(".list-item")
      .each((i, el) => {
        const text = $(el).text();
        if (text.includes("Prep")) {
          time.prep = $(el)
            .find("time")
            .text();
        } else if (text.includes("Cook")) {
          time.cook = $(el)
            .find("time")
            .text();
        }
      });

    this.recipe.servings = $(".post-header__servings .icon-with-text__children")
      .text()
      .replace("Makes ", "");
  }
}

module.exports = BbcGoodFoodScraper;
