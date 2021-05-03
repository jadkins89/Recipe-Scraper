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
    this.defaultSetDescription($);
      this.recipe.name = this.textTrim($("h1.title"));

      const jsonLD = $("script[type='application/ld+json']")[0];
      if (jsonLD && jsonLD.children && jsonLD.children[0].data) {
          const jsonRaw = jsonLD.children[0].data;
          const result = JSON.parse(jsonRaw);

          this.recipe.image = result.image[0] || '';
          this.recipe.tags = result.keywords ? result.keywords.split(',') : [];

          if (result.recipeCuisine) {
              this.recipe.tags.push(result.recipeCuisine)
          }

          if (result.recipeCategory) {
              this.recipe.tags.push(result.recipeCategory)
          }

          this.recipe.ingredients = result.recipeIngredient;
          this.recipe.instructions = result.recipeInstructions.map(step => step.text);

          this.recipe.time.prep = WoolworthsScraper.parsePTTime(result.prepTime);
          this.recipe.time.cook = WoolworthsScraper.parsePTTime(result.cookTime);
          this.recipe.time.total = WoolworthsScraper.parsePTTime(result.totalTime);

          this.recipe.servings = result.recipeYield;

      } else {
        // keep older code as fallback for required fields
          this.defaultSetImage($);
          const { ingredients, instructions } = this.recipe;

          $(".ingredient-list").each((i, el) => {
              ingredients.push(this.textTrim($(el)));
          });

          $(".step-content").each((i, el) => {
              let text = this.textTrim($(el));
              if (text.length) {
                  instructions.push(text.replace(/^\d+\.\s/g, ""));
              }
          });
      }
  }
}

module.exports = WoolworthsScraper;
