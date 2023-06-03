"use strict";

import BaseScraper from '../helpers/BaseScraper.js';

/**
 * Class for scraping melskitchencafe.com
 * @extends BaseScraper
 */
class MelsKitchenCafeScraper extends BaseScraper {
  constructor(url) {
    super(url, "melskitchencafe.com/");
  }

  scrape($) {
    this.defaultLD_JOSN($);
  }


}

export default MelsKitchenCafeScraper;
