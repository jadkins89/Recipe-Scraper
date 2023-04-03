"use strict";

const BaseScraper = require("../helpers/BaseScraper");

/**
 * Class for scraping bbc.co
 * @extends BaseScraper
 */
class SeriousEatsScraper extends BaseScraper {
  constructor(url) {
    super(url, "seriouseats.com/");
    if (this.url && this.url.includes("seriouseats.com/sponsored/")) {
      throw new Error("seriouseats.com sponsored recipes not supported");
    }
  }

  scrape($) {
    this.defaultLD_JOSN($);
  }
}

module.exports = SeriousEatsScraper;
