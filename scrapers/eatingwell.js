const request = require("request");
const cheerio = require("cheerio");

const RecipeSchema = require("../helpers/recipe-schema");

const eatingWell = url => {
  const Recipe = new RecipeSchema();
  return new Promise((resolve, reject) => {
    if (!url.includes("eatingwell.com/recipe")) {
      reject(new Error("url provided must include 'eatingwell.com/recipe'"));
    } else {
      request(url, (error, response, html) => {
        if (!error && response.statusCode == 200) {
          const $ = cheerio.load(html);

          Recipe.name = $(".recipeDetailHeader[itemprop=name]").text();

          $("span[itemprop=ingredients]").each((i, el) => {
            Recipe.ingredients.push($(el).text());
          });

          $(".recipeDirectionsListItem").each((i, el) => {
            Recipe.instructions.push($(el).text());
          });

          $(".prepTime__item").each((i, el) => {
            let title = $(el)
              .children(".prepTime__item--type")
              .text();
            let time = $(el)
              .children("time")
              .text();
            switch (title) {
              case "Prep":
                Recipe.time.prep = time;
                break;
              case "Active":
                Recipe.time.active = time;
                break;
              case "Ready In":
                Recipe.time.ready = time;
                break;
              default:
                break;
            }
          });

          Recipe.servings = $(".servingsCount")
            .text()
            .trim();

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

module.exports = eatingWell;
