"use strict";

const BaseScraper = require("../helpers/BaseScraper");

/**
 * Class for scraping eatingwell.com
 * @extends BaseScraper
 */
class EatingWellScraper extends BaseScraper {
  constructor(url) {
    super(url, "eatingwell.com/recipe");
  }

  scrape($) {
    this.defaultLD_JOSN($);
    $(".mntl-recipe-details__nutrition-profile-item").each((i, el) => {
      this.recipe.tags.push(
        $(el).text()
      );
    });
  }
}

module.exports = EatingWellScraper;
