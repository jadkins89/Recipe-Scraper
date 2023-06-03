"use strict";

import BaseScraper from '../helpers/BaseScraper.js';

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

export default FoodNetworkScraper;
