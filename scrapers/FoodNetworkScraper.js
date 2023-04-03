"use strict";

const BaseScraper = require("../helpers/BaseScraper");

/**
 * Class for scraping foodnetwork.com
 * @extends BaseScraper
 */
class FoodNetworkScraper extends BaseScraper {
  constructor(url) {
    super(url, "foodnetwork.com/recipes/");
  }

  scrape($) {
    this.defaultLD_JOSN($);
  }
}

module.exports = FoodNetworkScraper;
