"use strict";

import BaseScraper from '../helpers/BaseScraper.js';

class AllRecipesScraper extends BaseScraper {
  constructor(url) {
    super(url, "allrecipes.com/recipe");
  }

  scrape($) {
    this.defaultLD_JOSN($);
  }
}

export default AllRecipesScraper;
