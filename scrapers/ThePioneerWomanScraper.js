"use strict";

const BaseScraper = require("../helpers/BaseScraper");

/**
 * Class for scraping thepioneerwoman.com
 * @extends BaseScraper
 */
class ThePioneerWomanScraper extends BaseScraper {
  constructor(url) {
    super(url, "thepioneerwoman.com/food-cooking/");
  }

  scrape($) {
    this.defaultSetImage($);
    this.defaultSetDescription($);
    const { ingredients, instructions, time } = this.recipe;
    this.recipe.name = $(".recipe-hed")
      .first()
      .text();

    $(".ingredient-item").each((i, el) => {
      ingredients.push(this.textTrim($(el)).replace(/\s\s+/g, " "));
    });

    $(".direction-lists")
      .find("li")
      .each((i, el) => {
        instructions.push(this.textTrim($(el)));
      });

    if (!instructions.length) {
      let directions = $(".direction-lists")
        .contents()
        .each((i, el) => {
          if (el.type === "text") {
            instructions.push(this.textTrim($(el)));
          }
        });
    }

    time.prep = this.textTrim($(".prep-time-amount")).replace(/\s\s+/g, " ");
    time.cook = this.textTrim($(".cook-time-amount")).replace(/\s\s+/g, " ");
    time.total = this.textTrim($(".total-time-amount")).replace(/\s\s+/g, " ");
    this.recipe.servings = this.textTrim($(".yields-amount")).replace(
      /\s\s+/g,
      " "
    );
  }
}

module.exports = ThePioneerWomanScraper;
