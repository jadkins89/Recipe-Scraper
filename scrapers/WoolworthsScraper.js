"use strict";

const PuppeteerScraper = require("../helpers/PuppeteerScraper");

/**
 * Class for scraping woolworths.com.au
 * @extends PuppeteerScraper
 */
class WoolworthsScraper extends PuppeteerScraper {
  constructor(url) {
    super(url, "woolworths.com.au/shop/recipedetail/");
  }

  async customPoll(page) {
    let container,
      count = 0;
    do {
      container = await page.$(".recipeDetailContainer");
      if (!container) {
        await page.waitForTimeout(100);
        count++;
      }
    } while (!container && count < 60);
    return true;
  }

  scrape($) {
    this.defaultSetImage($);
    const { ingredients, instructions, time } = this.recipe;
    this.recipe.name = this.textTrim($(".recipeDetailContainer-title"));
    $(".recipeDetailContainer-ingredient").each((i, el) => {
      ingredients.push(this.textTrim($(el)));
    });

    $(".recipeDetailContainer-instructions").each((i, el) => {
      let text = this.textTrim($(el));
      if (text.length) {
        instructions.push(text.replace(/^\d+\.\s/g, ""));
      }
    });

    time.prep = this.textTrim($("span[itemprop='prepTime']")) + " Mins";
    time.cook = this.textTrim($("span[itemprop='cookTime']")) + " Mins";

    this.recipe.servings = $("span[itemprop='recipeYield']").text();
  }
}

module.exports = WoolworthsScraper;
