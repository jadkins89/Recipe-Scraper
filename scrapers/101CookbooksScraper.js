"use strict";

const BaseScraper = require("../helpers/BaseScraper");

class OneOOneCookbooksScraper extends BaseScraper {
  constructor(url) {
    super(url, "101cookbooks.com/");
  }

  scrape($) {
    this.defaultLD_JOSN($);
  }
}

module.exports = OneOOneCookbooksScraper;
