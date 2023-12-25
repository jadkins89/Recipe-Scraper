"use strict";

import BaseScraper from '../helpers/BaseScraper.js';

/**
 * Class for scraping damndelicious.net
 * @extends BaseScraper
 */
class DamnDeliciousScraper extends BaseScraper {
  constructor(url) {
    super(url, "damndelicious.net");
  }

  scrape($) {
    this.defaultLD_JOSN($);
    this.recipe.tags = [...this.recipe.tags, ...this.textTrim($('[rel="category tag"]')).split(' ')];
  }
}

export default DamnDeliciousScraper;
