const request = require("request");
const cheerio = require("cheerio");

const RecipeSchema = require("../helpers/recipe-schema");

const whatsGabyCooking = url => {
  const Recipe = new RecipeSchema();
  return new Promise((resolve, reject) => {
    if (!url.includes("whatsgabycooking.com/")) {
      reject(new Error("url provided must include 'whatsgabycooking.com/'"));
    } else {
      request(url, (error, response, html) => {
        if (!error && response.statusCode == 200) {
          const $ = cheerio.load(html);

          Recipe.name = $("#zlrecipe-title").text();

          $(".ingredient, .ingredient-label").each((i, el) => {
            let elText = $(el)
              .text()
              .trim();
            if (elText.length) {
              Recipe.ingredients.push(elText);
            }
          });

          $(".instruction, .instruction-label").each((i, el) => {
            Recipe.instructions.push(
              $(el)
                .text()
                .trim()
            );
          });

          Recipe.servings = $("span[itemprop=recipeYield]").text();

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

module.exports = whatsGabyCooking;
