"use strict";

const BaseScraper = require("../helpers/BaseScraper");

/**
 * Class for scraping omnivorescookbook.com
 * @extends BaseScraper
 */
class OmnivoresCookbookScraper extends BaseScraper {
  constructor(url) {
    super(url, "omnivorescookbook.com/");
  }

  scrape($) {
    this.defaultSetImage($);
    this.defaultSetDescription($);
    const { ingredients, instructions, time } = this.recipe;
    this.recipe.name = $(".wprm-recipe-name").text();

    $(".wprm-recipe-ingredient-group").each((i, el) => {
      let group = $(el)
        .find(".wprm-recipe-group-name")
        .text();
      if (group) {
        ingredients.push(group);
      }
      $(el)
        .find(".wprm-recipe-ingredient")
        .each((i, el) => {
          ingredients.push(this.textTrim($(el)).replace(/\s\s+/g, " "));
        });
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

    this.recipe.tags = $(".wprm-recipe-keyword")
      .text()
      .split(",")
      .map(x => x.trim());

    $(".wprm-recipe-time-container").each((i, el) => {
      let label = $(el)
        .children(".wprm-recipe-time-label")
        .text();
      let timeText = $(el)
        .children(".wprm-recipe-time")
        .text();
      if (label.includes("Prep")) {
        time.prep = timeText;
      } else if (label.includes("Cook")) {
        time.cook = timeText;
      } else if (label.includes("Resting")) {
        time.inactive = timeText;
      } else if (label.includes("Total")) {
        time.total = timeText;
      }
    });

    this.recipe.servings = $(".wprm-recipe-servings-with-unit").text();
  }
}

module.exports = OmnivoresCookbookScraper;
