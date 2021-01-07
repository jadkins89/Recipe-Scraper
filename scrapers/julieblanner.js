const request = require("request");
const cheerio = require("cheerio");

const RecipeSchema = require("../helpers/recipe-schema");

const julieblanner = url => {
  const Recipe = new RecipeSchema();
  return new Promise((resolve, reject) => {
    if (!url.includes("julieblanner.com/")) {
      reject(new Error("url provided must include 'julieblanner.com/'"));
    } else {
      request(url, (error, response, html) => {
        if (!error && response.statusCode === 200) {
          const $ = cheerio.load(html);

          Recipe.image = $("meta[property='og:image']").attr("content");
          Recipe.name = $(".wprm-recipe-name")
            .text()
            .trim();

          $(".wprm-recipe-ingredients > .wprm-recipe-ingredient").each(
            (i, el) => {
              Recipe.ingredients.push(
                $(el)
                  .text()
                  .replace(/(\s\s+|▢)/g, " ")
                  .trim()
              );
            }
          );

          $(".wprm-recipe-instruction-text").each((i, el) => {
            Recipe.instructions.push(
              $(el)
                .remove("img")
                .text()
                .trim()
            );
          });

          Recipe.time.prep = $(".wprm-recipe-prep-time-label")
            .next()
            .text();
          Recipe.time.cook = $(".wprm-recipe-cook-time-label")
            .next()
            .text();
          Recipe.time.inactive = $(".wprm-recipe-custom-time-label")
            .next()
            .text();
          Recipe.time.total = $(".wprm-recipe-total-time-label")
            .next()
            .text();
          Recipe.servings = $(".wprm-recipe-servings").text();

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

module.exports = julieblanner;
