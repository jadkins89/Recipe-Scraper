"use strict";

import BaseScraper from '../helpers/BaseScraper.js';

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

export default BonAppetitScraper;
