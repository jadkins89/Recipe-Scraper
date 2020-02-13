const request = require("request");

const RecipeSchema = require("../helpers/recipe-schema");

const urlRe = /\/(\d\d\d\d)\//;
const instructionsIndexRe = /(?:\d.)(.*)/;
const instructionsTipRe = /(Tip:)(.*)/;

const woolworths = url => {
  const Recipe = new RecipeSchema();
  return new Promise((resolve, reject) => {
    if (!url.includes("woolworths.com.au/shop/recipedetail/")) {
      reject(
        new Error(
          "url provided must include 'woolworths.com.au/shop/recipedetail/'"
        )
      );
    } else if (!urlRe.test(url)) {
      reject(new Error("No recipe found on page"));
    } else {
      const recipeId = urlRe.exec(url)[1];
      recipeJsonUrl = `https://www.woolworths.com.au/apis/ui/recipes/${recipeId}`;
      request(
        {
          url: recipeJsonUrl,
          json: true
        },
        (error, response, body) => {
          if (!error && response.statusCode === 200 && body) {
            Recipe.name = body.Title.trim();
            Recipe.ingredients = body.Ingredients.map(i =>
              i.Description.trim()
            );
            Recipe.time.prep = body.PreparationDuration.toString();
            Recipe.time.cook = body.CookingDuration.toString();
            Recipe.servings = body.Servings.toString();
            Recipe.instructions = [];
            body.Instructions.split("\r\n").map(step => {
              if (instructionsIndexRe.test(step)) {
                Recipe.instructions.push(
                  instructionsIndexRe.exec(step)[1].trim()
                );
              } else if (instructionsTipRe.test(step)) {
                // Skip
              } else {
                Recipe.instructions.push(step.trim());
              }
            });

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
        }
      );
    }
  });
};

module.exports = woolworths;
