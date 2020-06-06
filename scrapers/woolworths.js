const request = require("request");
const cheerio = require("cheerio");

const RecipeSchema = require("../helpers/recipe-schema");

const urlRe = /\/(\d\d\d\d)\//;
const instructionsIndexRe = /(?:\d.)(.*)/;
const instructionsTipRe = /(Tip:)(.*)/i;

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
        (error, response, html) => {
          if (!error && response.statusCode === 200 && html) {
            const $ = cheerio.load(html);

            Recipe.image = html.ImageFilename;
            Recipe.name = html.Title.trim();
            Recipe.ingredients = html.Ingredients.map(i =>
              i.Description.trim()
            );
            Recipe.time.prep = html.PreparationDuration.toString();
            Recipe.time.cook = html.CookingDuration.toString();
            Recipe.servings = html.Servings.toString();
            html.Instructions.split("\r\n").map(step => {
              let newIngredient = "";
              if (instructionsIndexRe.test(step)) {
                newIngredient = instructionsIndexRe.exec(step)[1].trim();
              } else if (instructionsTipRe.test(step)) {
                newIngredient = step.trim();
              }
              if (newIngredient.length) {
                Recipe.instructions.push(newIngredient);
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
