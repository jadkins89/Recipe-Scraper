"use strict";

const BaseScraper = require("../helpers/BaseScraper");

class AverieCooksScraper extends BaseScraper {
  constructor(url) {
    super(url, "averiecooks.com/");
  }

  scrape($) {
    this.defaultLD_JOSN($);
  }
}

module.exports = AverieCooksScraper;
