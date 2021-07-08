"use strict";

const BaseScraper = require("../helpers/BaseScraper");

/**
 * Class for scraping whatsgabycooking.com
 * @extends BaseScraper
 */
class WhatsGabyCookingScraper extends BaseScraper {
  constructor(url) {
    super(url, "whatsgabycooking.com/");
  }

  scrape($) {
    this.defaultSetImage($);
    this.defaultSetDescription($);
    const { ingredients, instructions, time } = this.recipe;
    this.recipe.name = $(".wprm-recipe-name").text();

    $(".wprm-recipe-ingredient").each((i, el) => {
      let elText = this.textTrim($(el));
      if (elText.length) {
        ingredients.push(elText);
      }
    });

    $(".wprm-recipe-instruction-group").each((i, el) => {
      let groupName = $(el)
        .find(".wprm-recipe-group-name")
        .text();
      let instruction = $(el)
        .find(".wprm-recipe-instruction-text")
        .text();
      if (groupName) {
        instructions.push(groupName);
      }
      instructions.push(instruction);
    });

    this.recipe.tags = $(".wprm-recipe-cuisine")
      .text()
      .split(",")
      .map(x => x.trim());

    const times = $(".wprm-recipe-time");
    time.prep = $(times.first()).text();
    time.cook = $(times.get(1)).text();
    time.total = $(times.last()).text();
    this.recipe.servings = $(".wprm-recipe-servings-with-unit").text();
  }
}

module.exports = WhatsGabyCookingScraper;
