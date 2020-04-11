const request = require("request");
const cheerio = require("cheerio");

const RecipeSchema = require("../helpers/recipe-schema");

const budgetBytes = url => {
  const Recipe = new RecipeSchema();
  return new Promise((resolve, reject) => {
    if (!url.includes("budgetbytes.com/")) {
      reject(new Error("url provided must include 'budgetbytes.com/'"));
    } else {
      request(url, (error, response, html) => {
        if (!error && response.statusCode === 200) {
          const $ = cheerio.load(html);

          Recipe.image = $("meta[property='og:image']").attr("content");
          Recipe.name = $(".wprm-recipe-name").text();

          $(".wprm-recipe-ingredient-notes").remove();
          $(".wprm-recipe-ingredient").each((i, el) => {
            Recipe.ingredients.push(
              $(el)
                .text()
                .trim()
            );
          });

          $(".wprm-recipe-instruction-text").each((i, el) => {
            Recipe.instructions.push($(el).text());
          });

          Recipe.time.prep = $(".wprm-recipe-prep-time-label")
            .next()
            .text();
          Recipe.time.cook = $(".wprm-recipe-cook-time-label")
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

module.exports = budgetBytes;
