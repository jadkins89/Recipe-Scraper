"use strict";

const BaseScraper = require("../helpers/BaseScraper");

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

module.exports = TasteOfHomeScraper;
