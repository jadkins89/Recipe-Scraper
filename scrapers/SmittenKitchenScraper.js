"use strict";

const BaseScraper = require("../helpers/BaseScraper");

/**
 * Class for scraping smittenkitchen.com
 * @extends BaseScraper
 */
class SmittenKitchenScraper extends BaseScraper {
  constructor(url) {
    super(url, "smittenkitchen.com/");
  }

  newScrape($) {
    const { ingredients, time } = this.recipe;
    this.recipe.name = $(".jetpack-recipe-title").text();
    this.defaultSetDescription($);

    $(".jetpack-recipe-ingredients")
      .children("ul")
      .first()
      .children()
      .each((i, el) => {
        ingredients.push($(el).text());
      });

    this.recipe.instructions = $(".jetpack-recipe-directions")
      .text()
      .split("\n")
      .filter(
        instruction =>
          instruction &&
          !instruction.includes("Do More:TwitterFacebookPinterestPrintEmail") &&
          !instruction.includes("\t")
      );

    if (!this.recipe.instructions.length) {
      let lastIngredient = ingredients[ingredients.length - 1];
      let recipeContents = $(".entry-content").text();
      this.recipe.instructions = recipeContents
        .slice(
          recipeContents.indexOf(lastIngredient) + lastIngredient.length,
          recipeContents.indexOf("Rate this:")
        )
        .split("\n")
        .filter(
          instruction =>
            instruction &&
            !instruction.includes(
              "Do More:TwitterFacebookPinterestPrintEmail"
            ) &&
            !instruction.includes("\t")
        );
    }

    time.total = $("time[itemprop=totalTime]")
      .text()
      .replace("Time: ", "");

    this.recipe.servings = $(".jetpack-recipe-servings")
      .text()
      .replace("Servings: ", "");
  }

  oldScrape($) {
    const body = $(".entry-content").children("p");
    let ingredientSwitch = false;
    let orderedListRegex = new RegExp(/\d\.\s/);
    let servingWords = ["Yield", "Serve", "Servings"];
    let servingsRegex = new RegExp(servingWords.join("|"), "i");

    body.each((i, el) => {
      if (i === 0) {
        this.recipe.name = this.textTrim($(el).children("b"));
      } else if (
        $(el).children("br").length &&
        !$(el).children("b").length &&
        !orderedListRegex.test($(el).text()) &&
        !servingsRegex.test($(el).text())
      ) {
        ingredientSwitch = true;
        let updatedIngredients = this.recipe.ingredients.concat(
          this.textTrim($(el)).split("\n")
        );
        this.recipe.ingredients = updatedIngredients;
      } else if (ingredientSwitch) {
        let updatedInstructions = this.recipe.instructions.concat(
          this.textTrim($(el)).split("\n")
        );
        this.recipe.instructions = updatedInstructions;
      } else {
        let possibleServing = $(el).text();
        if (servingsRegex.test(possibleServing)) {
          possibleServing.split("\n").forEach(line => {
            if (servingsRegex.test(line)) {
              this.recipe.servings = line.substring(line.indexOf(":") + 2);
            }
          });
        }
      }
    });
  }

  scrape($) {
    this.defaultSetImage($);
    const { tags } = this.recipe;
    if ($(".jetpack-recipe").length) {
      this.newScrape($);
    } else {
      this.oldScrape($);
    }

    $("a[rel='category tag']").each((i, el) => {
      tags.push($(el).text());
    });
  }
}

module.exports = SmittenKitchenScraper;
