"use strict";

import BaseScraper from '../helpers/BaseScraper.js';

/**
 * Class for scraping foodandwine.com
 * @extends BaseScraper
 */
class FoodAndWineScraper extends BaseScraper {
  constructor(url) {
    super(url, "foodandwine.com/recipes/");
  }

  scrape($) {
    this.defaultLD_JOSN($);
  }
}

export default FoodAndWineScraper;
