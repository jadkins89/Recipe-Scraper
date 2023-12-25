"use strict";

import BaseScraper from '../helpers/BaseScraper.js';

/**
 * Class for scraping thepioneerwoman.com
 * @extends BaseScraper
 */
class ThePioneerWomanScraper extends BaseScraper {
  constructor(url) {
    super(url, "thepioneerwoman.com/food-cooking/");
  }

  scrape($) {
    this.defaultLD_JOSN($);
  }
}

export default ThePioneerWomanScraper;
