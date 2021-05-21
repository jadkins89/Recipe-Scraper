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
    this.recipe.name = $("#recipe-block__header_1-0").text();

    $("li.ingredient").each((i, el) => {
      ingredients.push(this.textTrim($(el)));
    });

    $("#structured-project__steps_1-0")
      .find("p")
      .each((i, el) => {
        instructions.push(
          $(el)
            .text()
            .trim()
        );
      });

    time.prep = this.textTrim($(".prep-time .meta-text__data")).replace(
      "\n",
      " "
    );

    time.active = this.textTrim($(".active-time .meta-text__data")).replace(
      "\n",
      " "
    );

    time.inactive = this.textTrim($(".custom-time .meta-text__data")).replace(
      "\n",
      " "
    );

    time.cook = this.textTrim($(".cook-time .meta-text__data")).replace(
      "\n",
      " "
    );

    time.total = this.textTrim($(".total-time .meta-text__data")).replace(
      "\n",
      " "
    );

    this.recipe.servings = this.textTrim(
      $(".recipe-serving .meta-text__data")
    ).replace("\n", " ");
  }
}

module.exports = SimplyRecipesScraper;
