"use strict";

const BaseScraper = require("../helpers/BaseScraper");

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

module.exports = ThePioneerWomanScraper;
