"use strict";

const BaseScraper = require("../helpers/BaseScraper");

/**
 * Class for scraping foodnetwork.com
 * @extends BaseScraper
 */
class FoodNetworkScraper extends BaseScraper {
  constructor(url) {
    super(url, "foodnetwork.com/recipes/");
  }

  scrape($) {
    this.defaultSetImage($);
    this.defaultSetDescription($);
    const { ingredients, instructions, tags, time } = this.recipe;
    this.recipe.name = $(".o-AssetTitle__a-HeadlineText")
      .first()
      .text();

    $(".o-Ingredients__a-Ingredient, .o-Ingredients__a-SubHeadline").each(
      (i, el) => {
        if (!$(el).hasClass("o-Ingredients__a-Ingredient--SelectAll")) {
          const item = $(el)
            .text()
            .replace(/\s\s+/g, "");
          ingredients.push(item);
        }
      }
    );

    $(".o-Method__m-Step").each((i, el) => {
      const step = $(el)
        .text()
        .replace(/\s\s+/g, "");
      if (step != "") {
        instructions.push(step);
      }
    });

    $(".o-RecipeInfo li").each((i, el) => {
      let timeItem = $(el)
        .text()
        .replace(/\s\s+/g, "")
        .split(":");
      switch (timeItem[0]) {
        case "Prep":
          time.prep = timeItem[1];
          break;
        case "Active":
          time.active = timeItem[1];
          break;
        case "Inactive":
          time.inactive = timeItem[1];
          break;
        case "Cook":
          time.cook = timeItem[1];
          break;
        case "Total":
          time.total = timeItem[1];
          break;
        default:
      }
    });

    $(".o-Capsule__a-Tag").each((i, el) => {
      tags.push($(el).text());
    });
  }
}

module.exports = FoodNetworkScraper;
