"use strict";

const BaseScraper = require("../helpers/BaseScraper");

/**
 * Class for scraping tasteofhome.com
 * @extends BaseScraper
 */
class TasteOfHomeScraper extends BaseScraper {
  constructor(url) {
    super(url, "tasteofhome.com/recipes/");
  }

  scrape($) {
    this.defaultSetImage($);
    this.defaultSetDescription($);
    const { ingredients, instructions, tags, time } = this.recipe;
    this.recipe.name = $("h1.recipe-title")
      .text()
      .trim();

    $("meta[property='article:tag']").each((i, el) => {
      tags.push($(el).attr("content"));
    });

    $(".recipe-ingredients__list li").each((i, el) => {
      ingredients.push($(el).text());
    });

    $(".recipe-directions__item").each((i, el) => {
      instructions.push(this.textTrim($(el)));
    });

    let timeStr = $(".recipe-time-yield__label-prep")
      .text()
      .split(/Bake:/g);
    time.prep = timeStr[0].replace("Prep:", "").trim();
    time.cook = (timeStr[1] || "").trim();
    this.recipe.servings = $(".recipe-time-yield__label-servings").text().trim();
  }
}

module.exports = TasteOfHomeScraper;
