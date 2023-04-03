"use strict";

const PuppeteerScraper = require("../helpers/PuppeteerScraper");

/**
 * Class for scraping damndelicious.net
 * @extends PuppeteerScraper
 */
class DamnDeliciousScraper extends PuppeteerScraper {
  constructor(url) {
    super(url, "damndelicious.net");
  }

  scrape($) {
    this.defaultLD_JOSN($);
    this.recipe.tags = [...this.recipe.tags, ...this.textTrim($('[rel="category tag"]')).split(' ')];
  }
}

module.exports = DamnDeliciousScraper;
