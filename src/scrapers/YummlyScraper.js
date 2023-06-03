"use strict";

import PuppeteerScraper from '../helpers/PuppeteerScraper.js';

/**
 * Class for scraping yummly.com
 * @extends PuppeteerScraper
 */
class YummlyScraper extends PuppeteerScraper {
  constructor(url) {
    super(url, "yummly.com/recipe");
  }


  /**
   * @override
   * Navigates through steps to recipe
   */
  async customPoll(page) {
    try {
      const selectorForLoadMoreButton = "a.view-more-steps";

      let loadMoreVisible = await PuppeteerScraper.isElementVisible(page, selectorForLoadMoreButton);
      while (loadMoreVisible) {
        await page
          .click(selectorForLoadMoreButton)
          .catch(() => {
          });
        loadMoreVisible = await PuppeteerScraper.isElementVisible(page, selectorForLoadMoreButton);
      }
    } catch (err) {
      console.log(err)
    }
  }

  scrape($) {
    this.defaultLD_JOSN($);

    const instructions = [];
    if (this.recipe.instructions.length === 0) {
      $(".step").each((i, el) => {
        instructions.push($(el).text());
      });

      if(instructions.length > 0) this.recipe.instructions = instructions;
    }
  }
}

export default YummlyScraper;
