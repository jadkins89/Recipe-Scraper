"use strict";

const BaseScraper = require("../helpers/BaseScraper");

/**
 * Class for scraping minimalistbaker.com
 * @extends BaseScraper
 */
class MinimalistBakerScraper extends BaseScraper {
  constructor(url) {
    super(url, "minimalistbaker.com/");
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

    $(".wprm-recipe-instruction-group").each((i, el) => {
      let group = $(el)
        .children(".wprm-recipe-group-name")
        .text();
      if (group.length) {
        instructions.push(group);
      }
      $(el)
        .find(".wprm-recipe-instruction-text")
        .each((i, elChild) => {
          instructions.push($(elChild).text());
        });
    });

    this.recipe.tags = $(".wprm-recipe-cuisine")
      .text()
      .split(",")
      .map(x => x.trim());

    time.prep = $(".wprm-recipe-time")
      .first()
      .text();
    time.cook = $($(".wprm-recipe-time").get(1)).text();
    time.total = $(".wprm-recipe-time")
      .last()
      .text();

    this.recipe.servings = $(".wprm-recipe-servings")
      .first()
      .text();
  }
}

module.exports = MinimalistBakerScraper;
