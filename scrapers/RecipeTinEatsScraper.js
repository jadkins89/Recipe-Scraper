"use strict";

const BaseScraper = require("../helpers/BaseScraper");

/**
 * Class for scraping recipetineats.com
 * @extends BaseScraper
 */
class RecipeTinEatsScraper extends BaseScraper {
  constructor(url) {
    super(url, "recipetineats.com/");
  }

  scrape($) {
    this.defaultSetImage($);
    this.defaultSetDescription($);
    const { ingredients, instructions, time } = this.recipe;
    this.recipe.name = $("meta[property='og:title']").attr("content");

    $(".wprm-recipe-ingredient").each((i, el) => {
      ingredients.push(
        $(el)
          .text()
          .replace(/\s\s+/g, " ")
          .replace(" ,", ",")
          .replace("▢", "")
          .trim()
      );
    });

    $(".wprm-recipe-instruction-group").each((i, el) => {
      instructions.push(
        $(el)
          .children(".wprm-recipe-group-name")
          .text()
      );
      $(el)
        .find(".wprm-recipe-instruction-text")
        .each((i, elChild) => {
          instructions.push($(elChild).text());
        });
    });

    $(".wprm-recipe-time-container").each((i, el) => {
      let text = $(el).text();
      if (text.includes("Prep:")) {
        time.total = text.replace("Prep:", "").trim();
      } else if (text.includes("Cook:")) {
        time.prep = text.replace("Cook:", "").trim();
      } else if (text.includes("Total:")) {
        time.cook = text.replace("Total:", "").trim();
      }
    });

    this.recipe.servings = this.textTrim($(".wprm-recipe-time").first());
  }
}

module.exports = RecipeTinEatsScraper;
