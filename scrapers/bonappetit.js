const request = require("request");
const cheerio = require("cheerio");

const RecipeSchema = require("../helpers/recipe-schema");

const bonAppetit = url => {
  const Recipe = new RecipeSchema();
  return new Promise((resolve, reject) => {
    if (!url.includes("bonappetit.com/recipe/")) {
      reject(new Error("url provided must include 'bonappetit.com/recipe/'"));
    } else {
      request(url, (error, response, html) => {
        if (!error && response.statusCode === 200) {
          const $ = cheerio.load(html);

          Recipe.image = $("meta[property='og:image']").attr("content");
          Recipe.name = $("meta[property='og:title']").attr("content");

          const container = $('div[data-testid="IngredientList"]');
          const ingredientsContainer = container.children("div");
          const units = ingredientsContainer.children("p");
          const ingredients = ingredientsContainer.children("div");

          units.each((i, el) => {
            Recipe.ingredients.push(
              `${$(el).text()} ${$(ingredients[i]).text()}`
            );
          });

          const instructionContainer = $(
            'div[data-testid="InstructionsWrapper"]'
          );

          instructionContainer.find("p").each((i, el) => {
            Recipe.instructions.push($(el).text());
          });

          Recipe.servings = container
            .children("p")
            .text()
            .split(" ")[0];

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

module.exports = bonAppetit;
