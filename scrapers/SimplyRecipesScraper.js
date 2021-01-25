"use strict";

const BaseScraper = require("../helpers/BaseScraper");

/**
 * Class for scraping simplyrecipes.com
 * @extends BaseScraper
 */
class SimplyRecipesScraper extends BaseScraper {
  constructor(url) {
    super(url, "simplyrecipes.com/recipes/");
  }

  scrape($) {
    this.defaultSetImage($);
    const { ingredients, instructions, time } = this.recipe;
    this.recipe.name = $(".recipe-callout")
      .children("h2")
      .text();

    $(".recipe-ingredients")
      .find("li.ingredient, p")
      .each((i, el) => {
        ingredients.push($(el).text());
      });

    $(".instructions")
      .find("p")
      .each((i, el) => {
        let curEl = $(el).text();
        if (curEl) {
          instructions.push(curEl.replace(/^\d+\s/, ""));
        }
      });

    let tagsSet = new Set();
    $(".taxonomy-term").each((i, el) => {
      tagsSet.add(
        $(el)
          .find("span")
          .text()
      );
    });
    this.recipe.tags = Array.from(tagsSet);

    time.prep = $(".preptime").text();
    time.cook = $(".cooktime").text();

    this.recipe.servings = $(".yield").text();
  }
}

module.exports = SimplyRecipesScraper;
