"use strict";

import BaseScraper from '../helpers/BaseScraper.js';

/**
 * Class for scraping tastesbetterfromscratch.com
 * @extends BaseScraper
 */
class TastesBetterFromScratchScraper extends BaseScraper {
  constructor(url) {
    super(url, "tastesbetterfromscratch.com");
  }

  scrape($) {
    this.defaultLD_JOSN($);
  }
}

export default TastesBetterFromScratchScraper;
