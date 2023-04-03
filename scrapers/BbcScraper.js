"use strict";

const BaseScraper = require("../helpers/BaseScraper");

/**
 * Class for scraping bbc.co
 * @extends BaseScraper
 */
class BbcScraper extends BaseScraper {
  constructor(url) {
    super(url, "bbc.co.uk/food/recipes/");
  }

  scrape($) {
    this.defaultLD_JOSN($);
  }
}

module.exports = BbcScraper;
