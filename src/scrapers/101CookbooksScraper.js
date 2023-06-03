"use strict";

import BaseScraper from '../helpers/BaseScraper.js';

class OneOOneCookbooksScraper extends BaseScraper {
  constructor(url) {
    super(url, "101cookbooks.com/");
  }

  scrape($) {
    this.defaultLD_JOSN($);
  }
}

export default OneOOneCookbooksScraper;
