"use strict";

import BaseScraper from '../helpers/BaseScraper.js';

/**
 * Class for scraping food.com
 * @extends BaseScraper
 */
class FoodScraper extends BaseScraper {
  constructor(url) {
    super(url, "food.com/recipe/");
  }

  scrape($) {
    this.defaultLD_JOSN($);
  }
}

export default FoodScraper;
