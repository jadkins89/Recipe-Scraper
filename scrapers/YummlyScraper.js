"use strict";

const PuppeteerScraper = require("../helpers/PuppeteerScraper");

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
    let steps = (await page.$$(".step")).length;
    let newSteps = -1;

    while (steps >= newSteps) {
      await page.waitFor(100);
      await page.$eval(
        "a.view-more-steps",
        /* istanbul ignore next */ elem => elem.click()
      );
      newSteps = (await page.$$(".step")).length;
    }
  }

  scrape($) {
    this.defaultSetImage($);
    const { ingredients, instructions, tags, time } = this.recipe;
    this.recipe.name = $(".recipe-title").text();

    $(".recipe-tag").each((i, el) => {
      tags.push(
        $(el)
          .find("a")
          .text()
      );
    });

    $(".IngredientLine").each((i, el) => {
      ingredients.push($(el).text());
    });

    $(".step").each((i, el) => {
      instructions.push($(el).text());
    });

    time.total =
      $("div.unit")
        .children()
        .first()
        .text() +
      " " +
      $("div.unit")
        .children()
        .last()
        .text();

    this.recipe.servings = $(".unit-serving-wrapper")
      .find(".greyscale-1")
      .text()
      .split(" ")[0];
  }
}

module.exports = YummlyScraper;
