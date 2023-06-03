"use strict";

import BaseScraper from '../helpers/BaseScraper.js';

/**
 * Class for scraping kitchenstories.com
 * @extends BaseScraper
 */
class KitchenStoriesScraper extends BaseScraper {
  constructor(url) {
    super(url);
    this.subUrl = [
      "kitchenstories.com/en/recipes",
      "kitchenstories.com/de/rezepte"
    ];
  }

  /**
   * @override
   */
  checkUrl() {
    const found = this.subUrl.reduce((found, url) => {
      if (this.url.includes(url)) {
        found = true;
      }
      return found;
    }, false);
    if (!found) {
      throw new Error(
        `url provided must include '${this.subUrl.join("' or '")}'`
      );
    }
  }

  scrape($) {
    this.defaultLD_JOSN($);
  }
}

export default KitchenStoriesScraper;
