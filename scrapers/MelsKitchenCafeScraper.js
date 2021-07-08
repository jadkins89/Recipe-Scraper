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

    // get tags from json schema
    const jsonLD = $("script[type='application/ld+json']:not(.yoast-schema-graph)")[0];
    if (jsonLD && jsonLD.children && jsonLD.children[0].data) {
      const jsonRaw = jsonLD.children[0].data;
      const result = JSON.parse(jsonRaw);

      if (result && result.keywords) {
        this.recipe.tags = result.keywords.split(',').map(t => t.trim());
      }
      if (result && result.recipeCategory) {
        this.recipe.tags.push(result.recipeCategory);
      }
    }

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
