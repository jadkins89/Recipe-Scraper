"use strict";

const BaseScraper = require("../helpers/BaseScraper");

/**
 * Class for scraping myrecipes.com
 * @extends BaseScraper
 */
class MyRecipesScraper extends BaseScraper {
  constructor(url) {
    super(url, "myrecipes.com/recipe");
  }

  scrape($) {
    this.defaultSetImage($);
    this.defaultSetDescription($);
    const { ingredients, instructions, time } = this.recipe;
    this.recipe.name = this.textTrim($("h1.headline"));

    $(".ingredients-item").each((i, el) => {
      const ingredient = this.textTrim($(el)).replace(/\s\s+/g, " ");
      ingredients.push(ingredient);
    });
    $($(".instructions-section-item").find("p")).each((i, el) => {
      instructions.push($(el).text());
    });

    let metaBody = $(".recipe-meta-item-body");

    time.active = this.textTrim(metaBody.first());
    time.total = this.textTrim($(metaBody.get(1)));

    this.recipe.servings = this.textTrim(metaBody.last());
  }
}

module.exports = MyRecipesScraper;
