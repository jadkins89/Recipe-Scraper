"use strict";

const PuppeteerScraper = require("../helpers/PuppeteerScraper");

/**
 * Class for scraping copykat.com
 * @extends PuppeteerScraper
 */
class CopyKatScraper extends PuppeteerScraper {
  constructor(url) {
    super(url, "copykat.com/");
  }

  scrape($) {
    this.defaultLD_JOSN($);
  }
}

module.exports = CopyKatScraper;
