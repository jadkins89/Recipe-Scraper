const request = require("request");
const cheerio = require("cheerio");

const RecipeSchema = require("../helpers/recipe-schema");

const bbcGoodFood = url => {
  const Recipe = new RecipeSchema();
  return new Promise((resolve, reject) => {
    if (!url.includes("bbcgoodfood.com/recipes/")) {
      reject(new Error("url provided must include 'bbcgoodfood.com/recipes/'"));
    } else {
      request(url, (error, response, html) => {
        if (!error && response.statusCode === 200) {
          const $ = cheerio.load(html);

          Recipe.image = $("meta[property='og:image']").attr("content");
          Recipe.name = $(".recipe-header__title").text();

          $(".ingredients-list__item").each((i, el) => {
            $(el)
              .find("p, h2, span")
              .remove();
            Recipe.ingredients.push($(el).text());
          });

          $(".method__item[itemprop=recipeInstructions]").each((i, el) => {
            Recipe.instructions.push($(el).text());
          });

          Recipe.time.prep = $(".recipe-details__cooking-time-prep")
            .children("span")
            .text();
          Recipe.time.cook = $(".recipe-details__cooking-time-cook")
            .children("span")
            .text();

          Recipe.servings = $(".recipe-details__text[itemprop=recipeYield]")
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

module.exports = bbcGoodFood;
