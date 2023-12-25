"use strict";

import BaseScraper from '../helpers/BaseScraper.js';

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

export default BbcScraper;
