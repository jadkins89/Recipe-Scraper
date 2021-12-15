"use strict";

const BaseScraper = require("../helpers/BaseScraper");

/**
 * Class for scraping melskitchencafe.com
 * @extends BaseScraper
 */
class MelsKitchenCafeScraper extends BaseScraper {
  constructor(url) {
    super(url, "melskitchencafe.com/");
  }

  scrape($) {
    this.defaultLD_JOSN($);
  }


}

module.exports = MelsKitchenCafeScraper;
