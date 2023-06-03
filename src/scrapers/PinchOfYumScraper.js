"use strict";

import BaseScraper from "../helpers/BaseScraper.js";

/**
 * Class for scraping pinchofyum.com
 * @extends BaseScraper
 */
class PinchOfYumScraper extends BaseScraper {
  constructor(url) {
    super(url, "pinchofyum.com/");
  }

  scrape($) {
    this.defaultLD_JOSN($);
  }
}

export default PinchOfYumScraper;
