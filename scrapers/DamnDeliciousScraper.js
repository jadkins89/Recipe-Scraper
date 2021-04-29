"use strict";

const PuppeteerScraper = require("../helpers/PuppeteerScraper");

/**
 * Class for scraping damndelicious.net
 * @extends PuppeteerScraper
 */
class DamnDeliciousScraper extends PuppeteerScraper {
  constructor(url) {
    super(url, "damndelicious.net");
  }

  scrape($) {
    this.defaultSetImage($);
    this.defaultSetDescription($);
    const { ingredients, instructions, time } = this.recipe;
    const titleDiv = $(".recipe-title");

    this.recipe.name = $(titleDiv)
      .children("h2")
      .text();

    this.recipe.tags = this.textTrim($('[itemprop="keywords"]')).split(' ');

    $(titleDiv)
      .find("p")
      .each((i, el) => {
        let title = $(el)
          .children("strong")
          .text();
        let data = $(el)
          .children("span")
          .text();

        switch (title) {
          case "Yield:":
            this.recipe.servings = data;
            break;
          case "prep time:":
            time.prep = data;
            break;
          case "cook time:":
            time.cook = data;
            break;
          case "total time:":
            time.total = data;
            break;
          default:
            break;
        }
      });

    $("li[itemprop=ingredients]").each((i, el) => {
      ingredients.push($(el).text());
    });

    $(".instructions")
      .find("li")
      .each((i, el) => {
        instructions.push($(el).text());
      });
  }
}

module.exports = DamnDeliciousScraper;
