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
    try {
        const selectorForLoadMoreButton = "a.view-more-steps";

        let loadMoreVisible = await PuppeteerScraper.isElementVisible(page, selectorForLoadMoreButton);
        while (loadMoreVisible) {
            await page
                .click(selectorForLoadMoreButton)
                .catch(() => {});
            loadMoreVisible = await PuppeteerScraper.isElementVisible(page, selectorForLoadMoreButton);
        }
    } catch (err) {
      console.log(err)
    }
  }

  scrape($) {
    this.defaultSetImage($);
    this.recipe.description = $("meta[name='description']").attr("content");
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
