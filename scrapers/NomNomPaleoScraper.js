"use strict";

const PuppeteerScraper = require("../helpers/PuppeteerScraper");

/**
 * Class for scraping nomnompaleo.com
 * @extends PuppeteerScraper
 */
class NomNomPaleoScraper extends PuppeteerScraper {
  constructor(url) {
    super(url, "nomnompaleo.com/");
  }

  scrape($) {
    this.defaultSetImage($);
    this.defaultSetDescription($);
    const { ingredients, instructions, time } = this.recipe;
    this.recipe.name = $(".wprm-recipe-name").text();

    $(".wprm-recipe-ingredient").each((i, el) => {
      ingredients.push(
        $(el)
          .text()
          .replace(/\s\s+/g, " ")
          .trim()
      );
    });

    this.recipe.tags = $(".wprm-recipe-keyword")
      .text()
      .split(",")
      .map(x => x.trim());

    $(".wprm-recipe-instruction-group").each((i, el) => {
      let groupName = $(el)
        .children(".wprm-recipe-group-name")
        .text();
      if (groupName.length) {
        instructions.push(groupName);
      }
      $(el)
        .find(".wprm-recipe-instruction-text")
        .each((i, elChild) => {
          instructions.push($(elChild).text());
        });
    });
    const times = $(".wprm-recipe-time");
    time.prep = $(times.first()).text();
    time.cook = $(times.get(1)).text();
    time.total = $(times.last()).text();

    this.recipe.servings = $(".wprm-recipe-servings-with-unit").text();
  }
}

module.exports = NomNomPaleoScraper;
