const request = require("request");
const cheerio = require("cheerio");

const RecipeSchema = require("../helpers/recipe-schema");

const gimmeSomeOven = url => {
  const Recipe = new RecipeSchema();
  return new Promise((resolve, reject) => {
    if (!url.includes("gimmesomeoven.com/")) {
      reject(new Error("url provided must include 'gimmesomeoven.com/'"));
    } else {
      request(url, (error, response, html) => {
        if (!error && response.statusCode === 200) {
          const $ = cheerio.load(html);

          Recipe.image = $("meta[property='og:image']").attr("content");
          Recipe.name = $(".tasty-recipes-header-content")
            .children("h2")
            .first()
            .text();

          $(".tasty-recipes-ingredients")
            .find("li")
            .each((i, el) => {
              Recipe.ingredients.push($(el).text());
            });

          $(".tasty-recipes-instructions")
            .find("li")
            .each((i, el) => {
              Recipe.instructions.push($(el).text());
            });

          Recipe.time.prep = $(".tasty-recipes-prep-time").text();
          Recipe.time.cook = $(".tasty-recipes-cook-time").text();
          Recipe.time.total = $(".tasty-recipes-total-time").text();

          $(".tasty-recipes-yield-scale").remove();
          Recipe.servings = $(".tasty-recipes-yield")
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

module.exports = gimmeSomeOven;
