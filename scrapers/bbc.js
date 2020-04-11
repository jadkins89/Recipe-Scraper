const request = require("request");
const cheerio = require("cheerio");

const RecipeSchema = require("../helpers/recipe-schema");

const bbc = url => {
  const Recipe = new RecipeSchema();
  return new Promise((resolve, reject) => {
    if (!url.includes("bbc.co.uk/food/recipes/")) {
      reject(new Error("url provided must include 'bbc.co.uk/food/recipes/'"));
    } else {
      request(url, (error, response, html) => {
        if (!error && response.statusCode === 200) {
          const $ = cheerio.load(html);

          Recipe.image = $("meta[property='og:image']").attr("content");
          Recipe.name = $(".content-title__text").text();

          $(".recipe-ingredients__list-item").each((i, el) => {
            Recipe.ingredients.push($(el).text());
          });

          $(".recipe-method__list-item-text").each((i, el) => {
            Recipe.instructions.push($(el).text());
          });

          Recipe.time.prep = $(".recipe-metadata__prep-time")
            .first()
            .text();
          Recipe.time.cook = $(".recipe-metadata__cook-time")
            .first()
            .text();

          Recipe.servings = $(".recipe-metadata__serving")
            .first()
            .text();

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

module.exports = bbc;
