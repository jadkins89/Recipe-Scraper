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
    this.defaultSetDescription($);
    const { ingredients, instructions, time } = this.recipe;
    this.recipe.name = $("meta[itemprop='name']").attr("content");

    $("li.ingredient")
      .each((i, el) => {
        ingredients.push($(el).text().replace(/\n/g, "").trim());
      });

    $(".section--instructions li.comp p")
      .each((i, el) => {
        let curEl = $(el).text();
        if (curEl) {
          instructions.push(curEl.replace(/^\d+\s/, "").replace(/\n/g, "").trim());
        }
      });

    const tags = $("meta[name='sailthru.tags']").attr("content");
    if (tags) {
        this.recipe.tags = tags.split(',')
    }

    time.prep = $(".prep-time span span.meta-text__data").text().replace(/\n/g, "").trim();
    time.cook = $(".custom-time span span.meta-text__data").text().replace(/\n/g, "").trim();
    time.total = $(".total-time span span.meta-text__data").text().replace(/\n/g, "").trim();

    this.recipe.servings = $(".recipe-serving span span.meta-text__data").text().replace(/\n/g, " ").trim();
  }
}

module.exports = SimplyRecipesScraper;
