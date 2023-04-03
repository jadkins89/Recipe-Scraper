"use strict";

const BaseScraper = require("../helpers/BaseScraper");

/**
 * Class for scraping foodandwine.com
 * @extends BaseScraper
 */
class FoodAndWineScraper extends BaseScraper {
  constructor(url) {
    super(url, "foodandwine.com/recipes/");
  }

  scrape($) {
    this.defaultLD_JOSN($);
  }
}

module.exports = FoodAndWineScraper;
