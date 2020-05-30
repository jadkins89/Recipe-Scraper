const request = require("request");
const cheerio = require("cheerio");

const RecipeSchema = require("../helpers/recipe-schema");

const smittenKitchen = url => {
  const Recipe = new RecipeSchema();
  return new Promise((resolve, reject) => {
    if (!url.includes("smittenkitchen.com/")) {
      reject(new Error("url provided must include 'smittenkitchen.com/'"));
    } else {
      request(url, (error, response, html) => {
        if (!error && response.statusCode === 200) {
          const $ = cheerio.load(html);

          if ($(".jetpack-recipe").length) {
            newSmitten($, Recipe);
          } else {
            oldSmitten($, Recipe);
          }
          if (
            !Recipe.name ||
            !Recipe.ingredients.length ||
            !Recipe.instructions.length
          ) {
            reject(new Error("No recipe found on page"));
          } else {
            resolve(Recipe);
          }
        } else {
          reject(new Error("No recipe found on page"));
        }
      });
    }
  });
};

const oldSmitten = ($, Recipe) => {
  const body = $(".entry-content").children("p");
  let ingredientSwitch = false;
  let orderedListRegex = new RegExp(/\d\.\s/);
  let servingWords = ["Yield", "Serve", "Servings"];
  let servingsRegex = new RegExp(servingWords.join("|"), "i");

  Recipe.image = $("meta[property='og:image']").attr("content");
  body.each((i, el) => {
    if (i === 0) {
      Recipe.name = $(el)
        .children("b")
        .text()
        .trim();
    } else if (
      $(el).children("br").length &&
      !$(el).children("b").length &&
      !orderedListRegex.test($(el).text()) &&
      !servingsRegex.test($(el).text())
    ) {
      ingredientSwitch = true;
      let updatedIngredients = Recipe.ingredients.concat(
        $(el)
          .text()
          .trim()
          .split("\n")
      );
      Recipe.ingredients = updatedIngredients;
    } else if (ingredientSwitch) {
      let updatedInstructions = Recipe.instructions.concat(
        $(el)
          .text()
          .trim()
          .split("\n")
      );
      Recipe.instructions = updatedInstructions;
    } else {
      let possibleServing = $(el).text();
      if (servingsRegex.test(possibleServing)) {
        possibleServing.split("\n").forEach(line => {
          if (servingsRegex.test(line)) {
            Recipe.servings = line.substring(line.indexOf(":") + 2);
          }
        });
      }
    }
  });
};

const newSmitten = ($, Recipe) => {
  Recipe.image = $("meta[property='og:image']").attr("content");
  Recipe.name = $(".jetpack-recipe-title").text();

  $(".jetpack-recipe-ingredients")
    .children("ul")
    .first()
    .children()
    .each((i, el) => {
      Recipe.ingredients.push($(el).text());
    });

  Recipe.instructions = $(".jetpack-recipe-directions")
    .text()
    .split("\n")
    .filter(instruction => {
      if (
        !instruction ||
        instruction.includes("Do More:TwitterFacebookPinterestPrintEmail") ||
        instruction.includes("\t")
      ) {
        return false;
      }
      return true;
    });

  if (!Recipe.instructions.length) {
    let lastIngredient = Recipe.ingredients[Recipe.ingredients.length - 1];
    let recipeContents = $(".entry-content").text();
    Recipe.instructions = recipeContents
      .slice(
        recipeContents.indexOf(lastIngredient) + lastIngredient.length,
        recipeContents.indexOf("Rate this:")
      )
      .split("\n")
      .filter(instruction => {
        if (
          !instruction ||
          instruction.includes("Do More:TwitterFacebookPinterestPrintEmail") ||
          instruction.includes("\t")
        ) {
          return false;
        }
        return true;
      });
  }

  Recipe.time.total = $("time[itemprop=totalTime]")
    .text()
    .replace("Time: ", "");

  Recipe.servings = $(".jetpack-recipe-servings")
    .text()
    .replace("Servings: ", "");
};

module.exports = smittenKitchen;
