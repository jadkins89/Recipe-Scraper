"use strict";

const BaseScraper = require("../helpers/BaseScraper");

/**
 * Class for scraping budgetbytes.com
 * @extends BaseScraper
 */
class BudgetBytesScraper extends BaseScraper {
  constructor(url) {
    super(url, "budgetbytes.com/");
  }

  scrape($) {
    this.defaultLD_JOSN($);
  }
}

module.exports = BudgetBytesScraper;
