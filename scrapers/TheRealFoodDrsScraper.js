"use strict";

const PuppeteerScraper = require("../helpers/PuppeteerScraper");

/**
 * Class for scraping therealfooddrs.com
 * @extends PuppeteerScraper
 */
class TheRealFoodDrsScraper extends PuppeteerScraper {
  constructor(url) {
    super(url, "therealfoodrds.com/");
  }

  scrape($) {
    this.defaultSetImage($);
    this.defaultSetDescription($);
    const { ingredients, instructions, time } = this.recipe;
    this.recipe.name = $(".tasty-recipes-entry-header")
      .children("h2")
      .first()
      .text();

    $(".tasty-recipes-ingredients")
      .find("li")
      .each((i, el) => {
        ingredients.push(
          $(el)
            .text()
            .replace(/\s\s+/g, "")
        );
      });

    $(".tasty-recipes-instructions")
      .find("h4, li")
      .each((i, el) => {
        instructions.push(
          $(el)
            .text()
            .replace(/\s\s+/g, "")
        );
      });

    this.recipe.tags = $(".tasty-recipes-category")
      .text()
      .split("|")
      .map(x => x.trim());

    time.prep = $(".tasty-recipes-prep-time").text();
    time.cook = $(".tasty-recipes-cook-time").text();
    time.total = $(".tasty-recipes-total-time").text();

    this.recipe.servings = $(".tasty-recipes-yield")
      .children("span")
      .first()
      .text();
  }
}

module.exports = TheRealFoodDrsScraper;
