"use strict";

const BaseScraper = require("../helpers/BaseScraper");

/**
 * Class for scraping bonappetit.com
 * @extends BaseScraper
 */
class BonAppetitScraper extends BaseScraper {
  constructor(url) {
    super(url, "bonappetit.com/recipe/");
  }

  scrape($) {
    this.defaultSetImage($);
    this.defaultSetDescription($);
    const { ingredients, instructions } = this.recipe;

    this.recipe.name = $("meta[property='og:title']").attr("content");
    const tags = $("meta[name='keywords']").attr("content");

    this.recipe.tags = tags ? tags.split(',') : [];

    const container = $('div[data-testid="IngredientList"]');
    const ingredientsContainer = container.children("div");
    const units = ingredientsContainer.children("p");
    const ingrDivs = ingredientsContainer.children("div");

    units.each((i, el) => {
      ingredients.push(`${$(el).text()} ${$(ingrDivs[i]).text()}`);
    });

    const instructionContainer = $('div[data-testid="InstructionsWrapper"]');

    instructionContainer.find("p").each((i, el) => {
      instructions.push($(el).text());
    });

    this.recipe.servings = container
      .children("p")
      .text()
      .split(" ")[0];
  }
}

module.exports = BonAppetitScraper;
