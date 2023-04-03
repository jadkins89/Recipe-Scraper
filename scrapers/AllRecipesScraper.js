"use strict";

const BaseScraper = require("../helpers/BaseScraper");

class AllRecipesScraper extends BaseScraper {
  constructor(url) {
    super(url, "allrecipes.com/recipe");
  }

  scrape($) {
    this.defaultLD_JOSN($);
  }
}

module.exports = AllRecipesScraper;
