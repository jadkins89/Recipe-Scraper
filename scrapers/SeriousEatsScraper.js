"use strict";

const BaseScraper = require("../helpers/BaseScraper");

/**
 * Class for scraping bbc.co
 * @extends BaseScraper
 */
class SeriousEatsScraper extends BaseScraper {
  constructor(url) {
    super(url, "seriouseats.com/");
    if (this.url && this.url.includes("seriouseats.com/sponsored/")) {
      throw new Error("seriouseats.com sponsored recipes not supported");
    }
  }

  scrape($) {
    this.defaultSetImage($);
    const { ingredients, instructions, time } = this.recipe;
    this.recipe.name = $(".recipe-title")
      .text()
      .replace(/\s\s+/g, "");

    $(".ingredient").each((i, el) => {
      ingredients.push($(el).text());
    });

    $(".recipe-about")
      .children("li")
      .each((i, el) => {
        const label = $(el)
          .children(".label")
          .text();
        const info = $(el)
          .children(".info")
          .text();

        if (label.includes("Active")) {
          time.active = info;
        } else if (label.includes("Total")) {
          time.total = info;
        } else if (label.includes("Yield")) {
          this.recipe.servings = info;
        }
      });

    let tagsSet = new Set();
    $("li[class='label label-category top-level']").each((i, el) => {
      let text = $(el)
        .find("a")
        .text();
      if (text) {
        tagsSet.add(text);
      }
    });

    this.recipe.tags = Array.from(tagsSet);

    $(".recipe-procedure-text").each((i, el) => {
      instructions.push(
        $(el)
          .text()
          .replace(/\s\s+/g, "")
      );
    });
  }
}

module.exports = SeriousEatsScraper;
