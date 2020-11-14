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

          Recipe.image = $("meta[name='og:image']").attr("content");
          Recipe.name = $("meta[name='og:title']").attr("content");

          $(".recipe-template__ingredients")
            .find(".list-item")
            .each((i, el) => {
              Recipe.ingredients.push(
                $(el)
                  .text()
                  .replace(" ,", ",")
              );
            });

          $(".recipe-template__method-steps")
            .find(".list-item")
            .children("div")
            .each((i, el) => {
              Recipe.instructions.push($(el).text());
            });

          $(".cook-and-prep-time")
            .find(".list-item")
            .each((i, el) => {
              const text = $(el).text();
              if (text.includes("Prep")) {
                Recipe.time.prep = $(el)
                  .find("time")
                  .text();
              } else if (text.includes("Cook")) {
                Recipe.time.cook = $(el)
                  .find("time")
                  .text();
              }
            });

          Recipe.servings = $(".masthead__servings")
            .text()
            .replace("Makes ", "");

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
