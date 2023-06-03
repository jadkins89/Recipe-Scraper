"use strict";

import BaseScraper from '../helpers/BaseScraper.js';

class AmbitiousKitchenScraper extends BaseScraper {
  constructor(url) {
    super(url, "ambitiouskitchen.com/");
  }

  scrape($) {
    this.defaultLD_JOSN($);
  }
}

export default AmbitiousKitchenScraper;
