"use strict";

const BaseScraper = require("../helpers/BaseScraper");

/**
 * Class for scraping epicurious.com
 * @extends BaseScraper
 */
class EpicuriousScraper extends BaseScraper {
  constructor(url) {
    super(url, "epicurious.com/recipes/");
  }

  scrape($) {
    this.defaultSetImage($);
    this.defaultSetDescription($);
    const { ingredients, instructions, tags, time } = this.recipe;
    this.recipe.name = $("h1[itemprop=name]")
      .text()
      .trim();

    $(".ingredient").each((i, el) => {
      ingredients.push($(el).text());
    });

    $(".preparation-step").each((i, el) => {
      instructions.push(
        $(el)
          .text()
          .replace(/\s\s+/g, "")
      );
    });

    $("dt[itemprop=recipeCategory]").each((i, el) => {
      tags.push($(el).text());
    });

    time.active = $("dd.active-time").text();
    time.total = $("dd.total-time").text();

    this.recipe.servings = $("dd.yield").text();
  }
}

module.exports = EpicuriousScraper;
