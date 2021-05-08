"use strict";

const PuppeteerScraper = require("../helpers/PuppeteerScraper");

/**
 * Class for scraping closetcooking.com
 * @extends PuppeteerScraper
 */
class ClosetCookingScraper extends PuppeteerScraper {
  constructor(url) {
    super(url, "closetcooking.com/");
  }

  scrape($) {
    this.defaultSetImage($);
    this.defaultSetDescription($);
    const { ingredients, instructions, tags, time } = this.recipe;
    this.recipe.name = $(".recipe_title").text();

    $(".ingredients")
      .children("h6, li")
      .each((i, el) => {
        ingredients.push($(el).text());
      });

    $(".instructions")
      .children("h6, li")
      .each((i, el) => {
        instructions.push($(el).text());
      });

    $("a[rel='category tag']").each((i, el) => {
      tags.push($(el).text());
    });

    let metaData = $(".time");
    let prepText = metaData.first().text();
    time.prep = prepText.slice(prepText.indexOf(":") + 1).trim();
    let cookText = $(metaData.get(1)).text();
    time.cook = cookText.slice(cookText.indexOf(":") + 1).trim();
    let totalText = $(metaData.get(2)).text();
    time.total = totalText.slice(totalText.indexOf(":") + 1).trim();

    let servingsText = $(".yield").text();
    this.recipe.servings = servingsText
      .slice(servingsText.indexOf(":") + 1)
      .trim();
  }
}

module.exports = ClosetCookingScraper;
