"use strict";

const BaseScraper = require("../helpers/BaseScraper");

/**
 * Class for scraping food.com
 * @extends BaseScraper
 */
class FoodScraper extends BaseScraper {
  constructor(url) {
    super(url, "food.com/recipe/");
  }

  scrape($) {
    this.defaultLD_JOSN($);
  }
}

module.exports = FoodScraper;
