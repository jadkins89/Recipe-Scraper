"use strict";

const BaseScraper = require("../helpers/BaseScraper");

class OneOOneCookbooksScraper extends BaseScraper {
  constructor(url) {
    super(url, "101cookbooks.com/");
  }

  scrape($) {
    this.defaultSetImage($);
    this.defaultSetDescription($);
    const { ingredients, instructions, time } = this.recipe;
    const body = $(".wprm-recipe-container");
    this.recipe.name = body.children("h2").text();

    $(".wprm-recipe-ingredient").each((i, el) => {
      ingredients.push(
        $(el)
          .text()
          .replace(/\s\s+/g, " ")
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

    time.prep = $($(".wprm-recipe-time").get(1)).text();
    time.total = $(".wprm-recipe-time")
      .last()
      .text();

    this.recipe.servings = $(".wprm-recipe-time")
      .first()
      .text()
      .trim();
  }
}

module.exports = OneOOneCookbooksScraper;
