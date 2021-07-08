"use strict";

const BaseScraper = require("../helpers/BaseScraper");

/**
 * Class for scraping kitchenstories.com
 * @extends BaseScraper
 */
class KitchenStoriesScraper extends BaseScraper {
  constructor(url) {
    super(url);
    this.subUrl = [
      "kitchenstories.com/en/recipes",
      "kitchenstories.com/de/rezepte"
    ];
  }

  /**
   * @override
   */
  checkUrl() {
    const found = this.subUrl.reduce((found, url) => {
      if (this.url.includes(url)) {
        found = true;
      }
      return found;
    }, false);
    if (!found) {
      throw new Error(
        `url provided must include '${this.subUrl.join("' or '")}'`
      );
    }
  }

  scrape($) {
    this.defaultSetImage($);
    this.defaultSetDescription($);

    const { ingredients, instructions, time } = this.recipe;
    this.recipe.name = $(".recipe-title").text();

    const tags = $("meta[name='keywords']").attr("content");

    this.recipe.tags = tags ? tags.split(',').map(t => t.trim()) : [];

    $(".ingredients")
      .find("tr")
      .each((i, el) => {
        ingredients.push($(el).text());
      });

    $(".step")
      .children(".text")
      .each((i, el) => {
        instructions.push($(el).text());
      });

    $(".time-cell").each((i, el) => {
      let title = $(el)
        .children(".title")
        .text();
      let timeText = $(el)
        .find(".time")
        .text();
      let unit = $(el)
        .find(".unit")
        .text();
      if (parseInt(timeText)) {
        switch (title) {
          case "Preparation":
          case "Zubereitung":
            time.prep = `${timeText} ${unit}`;
            break;
          case "Baking":
          case "Backzeit":
            time.cook = `${timeText} ${unit}`;
            break;
          case "Resting":
          case "Ruhezeit":
            time.inactive = `${timeText} ${unit}`;
            break;
          default:
        }
      }
    });

    this.recipe.servings = $(".stepper-value").text();
  }
}

module.exports = KitchenStoriesScraper;
