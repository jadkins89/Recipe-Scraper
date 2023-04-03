"use strict";

const BaseScraper = require("../helpers/BaseScraper");

/**
 * Class for scraping bbcgoodfood.com
 * @extends BaseScraper
 */
class BbcGoodFoodScraper extends BaseScraper {
  constructor(url) {
    super(url, "bbcgoodfood.com/recipes/");
  }

  scrape($) {
    this.defaultLD_JOSN($);
  }
}

module.exports = BbcGoodFoodScraper;
