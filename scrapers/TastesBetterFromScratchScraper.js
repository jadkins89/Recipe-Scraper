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

    time.prep = $(".wprm-recipe-prep-time-container").text().replace('Prep', '').trim();
    time.cook = $(".wprm-recipe-cook-time-container").text().replace('Cook', '').trim();
    time.total = $(".wprm-recipe-total-time-container").text().replace('Total', '').trim();

    this.recipe.servings = $(".wprm-recipe-servings").text() || "";
  }
}

module.exports = TastesBetterFromScratchScraper;
