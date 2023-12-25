"use strict";

import BaseScraper from '../helpers/BaseScraper.js';

/**
 * Class for scraping tasteofhome.com
 * @extends BaseScraper
 */
class TasteOfHomeScraper extends BaseScraper {
  constructor(url) {
    super(url, "tasteofhome.com/recipes/");
  }

  scrape($) {
    this.defaultLD_JOSN($);

    $("script[data-article-tags]").each((i, el) => {
      this.recipe.tags = [...new Set([...this.recipe.tags, ...el.attribs['data-article-tags'].split(', ')])];
    });
  }
}

export default TasteOfHomeScraper;
