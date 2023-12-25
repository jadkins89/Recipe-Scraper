"use strict";

import BaseScraper from '../helpers/BaseScraper.js';

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

export default BbcGoodFoodScraper;
