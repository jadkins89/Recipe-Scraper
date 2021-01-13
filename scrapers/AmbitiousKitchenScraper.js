"use strict";

const BaseScraper = require("../helpers/BaseScraper");

class AmbitiousKitchenScraper extends BaseScraper {
  constructor(url) {
    super(url);
    this.subUrl = "ambitiouskitchen.com/";
  }

  scrape($) {
    this.setImage($);
    this.recipe.name = $(".wprm-recipe-name").text();
    const { ingredients, instructions, time } = this.recipe;

    $(".wprm-recipe-ingredient").each((i, el) => {
      let amount = $(el)
        .find(".wprm-recipe-ingredient-amount")
        .text();
      let unit = $(el)
        .find(".wprm-recipe-ingredient-unit")
        .text();
      let name = $(el)
        .find(".wprm-recipe-ingredient-name")
        .text();
      let ingredient = `${amount} ${unit} ${name}`
        .replace(/\s\s+/g, " ")
        .trim();
      ingredients.push(ingredient);
    });

    $(".wprm-recipe-instruction").each((i, el) => {
      instructions.push(
        $(el)
          .text()
          .trim()
      );
    });

    time.prep =
      `${$(".wprm-recipe-prep_time").text()} ${$(
        ".wprm-recipe-prep_time-unit"
      ).text()}` || "";
    time.cook =
      `${$(".wprm-recipe-cook_time").text()} ${$(
        ".wprm-recipe-cook_time-unit"
      ).text()}` || "";
    time.total =
      `${$(".wprm-recipe-total_time").text()} ${$(
        ".wprm-recipe-total_time-unit"
      ).text()}` || "";
    this.recipe.servings = $(".wprm-recipe-servings").text() || "";
  }
}

module.exports = AmbitiousKitchenScraper;
