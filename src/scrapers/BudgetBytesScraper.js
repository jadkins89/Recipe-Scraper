"use strict";

import BaseScraper from '../helpers/BaseScraper.js';

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

export default BudgetBytesScraper;
