"use strict";

const BaseScraper = require("../helpers/BaseScraper");

/**
 * Class for scraping pinchofyum.com
 * @extends BaseScraper
 */
class PinchOfYumScraper extends BaseScraper {
  constructor(url) {
    super(url, "pinchofyum.com/");
  }

  scrape($) {
    this.defaultSetImage($);
    this.defaultSetDescription($);
    const { ingredients, instructions, time } = this.recipe;
    this.recipe.name = $("meta[property='og:title']").attr("content");

    $(".tasty-recipes-ingredients")
      .find("li")
      .each((i, el) => {
        ingredients.push($(el).text());
      });

    $(".tasty-recipes-instructions")
      .find("li")
      .each((i, el) => {
        instructions.push($(el).text());
      });

    const tags = new Set();
    $("meta[property='slick:category']").each((i, el) => {
      const tag = $(el)
        .attr("content")
        .split(";")
        .forEach(str => tags.add(str.split(":")[1]));
    });
    this.recipe.tags = [...tags];

    time.prep = $(".tasty-recipes-prep-time").text();
    time.cook = $(".tasty-recipes-cook-time").text();
    time.total = $(".tasty-recipes-total-time").text();

    $(".tasty-recipes-yield-scale").remove();
    this.recipe.servings = this.textTrim($(".tasty-recipes-yield"));
  }
}

module.exports = PinchOfYumScraper;
