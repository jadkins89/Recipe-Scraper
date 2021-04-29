"use strict";

const BaseScraper = require("../helpers/BaseScraper");

/**
 * Class for scraping cookieandkate.com
 * @extends BaseScraper
 */
class CookieAndKateScraper extends BaseScraper {
  constructor(url) {
    super(url, "cookieandkate.com/");
  }

  scrape($) {
    this.defaultSetImage($);
    this.defaultSetDescription($);
    const { ingredients, instructions, tags, time } = this.recipe;
    this.recipe.name = $(".tasty-recipes")
      .children("h2")
      .text();

    $(".tasty-recipe-ingredients")
      .find("h4, li")
      .each((i, el) => {
        ingredients.push($(el).text());
      });

    $(".tasty-recipe-instructions")
      .find("li")
      .each((i, el) => {
        instructions.push($(el).text());
      });

    $("a[rel='category tag']").each((i, el) => {
      tags.push($(el).text());
    });

    time.prep = $(".tasty-recipes-prep-time").text();
    time.cook = $(".tasty-recipes-cook-time").text();
    time.total = $(".tasty-recipes-total-time").text();

    $(".tasty-recipes-yield-scale").remove();
    this.recipe.servings = $(".tasty-recipes-yield")
      .text()
      .trim();
  }
}

module.exports = CookieAndKateScraper;
