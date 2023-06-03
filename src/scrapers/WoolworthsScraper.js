"use strict";

import PuppeteerScraper from '../helpers/PuppeteerScraper.js';

/**
 * Class for scraping woolworths.com.au
 * @extends PuppeteerScraper
 */
class WoolworthsScraper extends PuppeteerScraper {
  constructor(url) {
    super(url, "woolworths.com.au/shop/recipes/");
  }

  async customPoll(page) {
    return await page.waitForSelector('#schema', {
      visible: true,
    });
  }

  scrape($) {
    this.defaultLD_JOSN($);
  }

}

export default WoolworthsScraper;
