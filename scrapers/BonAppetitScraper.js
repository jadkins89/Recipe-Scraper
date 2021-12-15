"use strict";

const BaseScraper = require("../helpers/BaseScraper");

/**
 * Class for scraping bonappetit.com
 * @extends BaseScraper
 */
class BonAppetitScraper extends BaseScraper {
  constructor(url) {
    super(url, "bonappetit.com/recipe/");
  }

  scrape($) {
    this.defaultLD_JOSN($);
  }
}

module.exports = BonAppetitScraper;
