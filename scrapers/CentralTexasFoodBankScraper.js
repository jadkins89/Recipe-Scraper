"use strict";

const BaseScraper = require("../helpers/BaseScraper");
const baseUrl = "https://www.centraltexasfoodbank.org";

/**
 * Class for scraping centraltexasfoodbank.org
 * @extends BaseScraper
 */
class CentralTexasFoodBankScraper extends BaseScraper {
  constructor(url) {
    super(url, "centraltexasfoodbank.org/recipe");
  }

  scrape($) {
    const { ingredients, instructions, time } = this.recipe;

    this.recipe.image =
      baseUrl +
      $(".middle-section")
        .find("img[typeof='foaf:Image']")
        .first()
        .prop("src");

    this.recipe.name = $("#block-basis-page-title")
      .find("span")
      .text()
      .toLowerCase()
      .replace(/\b\w/g, l => l.toUpperCase());

    $(".ingredients-container")
      .find(".field-item")
      .each((i, el) => {
        ingredients.push(
          $(el)
            .text()
            .trim()
        );
      });

    // Try a different pattern if first one fails
    if (!ingredients.length) {
      $(".field-name-field-ingredients")
        .children("div")
        .children("div")
        .each((i, el) => {
          ingredients.push(
            $(el)
              .text()
              .trim()
          );
        });
    }

    $(".bottom-section")
      .find("li")
      .each((i, el) => {
        instructions.push($(el).text());
      });

    // Try a different pattern if first one fails
    if (!instructions.length) {
      let done = false;
      $(".bottom-section")
        .find("p")
        .each((i, el) => {
          if (!done && !$(el).children("strong").length) {
            let instructionEls = $(el)
              .text()
              .trim()
              .replace(/\s\s+/g, " ");
            if (!instructionEls.length) done = true;
            let instructionList = instructionEls
              .replace(/\d+\.\s/g, "")
              .split("\n")
              .filter(instruction => !!instruction.length);
            instructions.push(...instructionList);
          }
        });
    }

    time.prep = $(".field-name-field-prep-time")
      .find("div")
      .text();
    time.cook = $(".field-name-field-cooking-time")
      .find("div")
      .text();
    this.recipe.servings = $(".field-name-field-serves-")
      .find("div")
      .text();
  }
}

module.exports = CentralTexasFoodBankScraper;
