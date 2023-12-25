"use strict";

import BaseScraper from '../helpers/BaseScraper.js';

/**
 * Class for scraping copykat.com
 * @extends BaseScraper
 */
class CopyKatScraper extends BaseScraper {
  constructor(url) {
    super(url, "copykat.com/");
  }

  scrape($) {
    this.defaultLD_JOSN($);
  }
}

export default CopyKatScraper;
