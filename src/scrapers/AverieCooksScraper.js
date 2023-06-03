"use strict";

import BaseScraper from '../helpers/BaseScraper.js';

class AverieCooksScraper extends BaseScraper {
  constructor(url) {
    super(url, "averiecooks.com/");
  }

  scrape($) {
    this.defaultLD_JOSN($);
  }
}

export default AverieCooksScraper;
