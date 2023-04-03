"use strict";

const BaseScraper = require("../helpers/BaseScraper");

class AmbitiousKitchenScraper extends BaseScraper {
  constructor(url) {
    super(url, "ambitiouskitchen.com/");
  }

  scrape($) {
    this.defaultLD_JOSN($);
  }
}

module.exports = AmbitiousKitchenScraper;
