"use strict";

const BaseScraper = require("../helpers/BaseScraper");

/**
 * Class for scraping melskitchencafe.com
 * @extends BaseScraper
 */
class MelsKitchenCafeScraper extends BaseScraper {
  constructor(url) {
    super(url, "melskitchencafe.com/");
  }

  scrape($) {
    this.defaultSetImage($);
    this.defaultSetDescription($);
    const { ingredients, instructions, time } = this.recipe;

    this.recipe.name = this.textTrim(
      $(".wp-block-mv-recipe .mv-create-title-primary")
    );

    $("div.mv-create-ingredients ul li").each((i, el) => {
      ingredients.push(this.textTrim($(el)));
    });

    $("div.mv-create-instructions ol li").each((i, el) => {
      instructions.push(this.textTrim($(el)));
    });

    time.prep = this.textTrim($(".mv-create-time-prep .mv-create-time-format"));
    time.cook = this.textTrim(
      $(".mv-create-time-active .mv-create-time-format")
    );
    time.inactive = this.textTrim(
      $(".mv-create-time-additional .mv-create-time-format")
    );
    time.total = this.textTrim(
      $(".mv-create-time-total .mv-create-time-format")
    );
    this.recipe.servings = this.textTrim(
      $(".mv-create-time-yield .mv-create-time-format")
    );
  }
}

module.exports = MelsKitchenCafeScraper;
