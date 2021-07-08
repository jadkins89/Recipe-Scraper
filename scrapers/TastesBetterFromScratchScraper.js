"use strict";

const PuppeteerScraper = require("../helpers/PuppeteerScraper");

/**
 * Class for scraping tastesbetterfromscratch.com
 * @extends PuppeteerScraper
 */
class TastesBetterFromScratchScraper extends PuppeteerScraper {
  constructor(url) {
    super(url, "tastesbetterfromscratch.com");
  }

  scrape($) {
    this.defaultSetImage($);
    this.defaultSetDescription($);
    const { ingredients, instructions, time } = this.recipe;
    this.recipe.name = $(".wprm-recipe-name").text();

    let course = this.textTrim($('.wprm-recipe-course'));
    let cuisine = this.textTrim($('.wprm-recipe-cuisine'));

    if (course) this.recipe.tags.push(course);
    if (cuisine) this.recipe.tags.push(cuisine);

    $(".wprm-recipe-ingredient").each((i, el) => {
      let amount = $(el)
        .find(".wprm-recipe-ingredient-amount")
        .text();
      let unit = $(el)
        .find(".wprm-recipe-ingredient-unit")
        .text();
      let name = $(el)
        .find(".wprm-recipe-ingredient-name")
        .text();
      let ingredient = `${amount} ${unit} ${name}`
        .replace(/\s\s+/g, " ")
        .trim();
      ingredients.push(ingredient);
    });

    $(".wprm-recipe-instruction").each((i, el) => {
      instructions.push(
        $(el)
          .text()
          .replace(/\s\s+/g, "")
      );
    });

    $(".wprm-recipe-time-container").each((i, el) => {
      let text = $(el).text();
      if (text.includes("Total Time:")) {
        time.total = text.replace("Total Time:", "").trim();
      } else if (text.includes("Prep Time:")) {
        time.prep = text.replace("Prep Time:", "").trim();
      } else if (text.includes("Cook Time:")) {
        time.cook = text.replace("Cook Time:", "").trim();
      }
    });

    this.recipe.servings = $(".wprm-recipe-servings").text() || "";
  }
}

module.exports = TastesBetterFromScratchScraper;
