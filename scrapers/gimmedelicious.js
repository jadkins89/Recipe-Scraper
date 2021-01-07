const request = require("request");
const cheerio = require("cheerio");

const RecipeSchema = require("../helpers/recipe-schema");

const gimmedelicious = url => {
  const Recipe = new RecipeSchema();
  return new Promise((resolve, reject) => {
    if (!url.includes("gimmedelicious.com/")) {
      reject(new Error("url provided must include 'gimmedelicious.com/'"));
    } else {
      request(url, (error, response, html) => {
        if (!error && response.statusCode === 200) {
          const $ = cheerio.load(html);

          Recipe.image = $("meta[property='og:image']").attr("content");
          Recipe.tags = (
            $("meta[name='keywords']").attr("content") || ""
          ).split(",");
          Recipe.name = $(".wprm-recipe-name")
            .text()
            .trim();

          $(".wprm-recipe-ingredients > .wprm-recipe-ingredient").each(
            (i, el) => {
              Recipe.ingredients.push(
                $(el)
                  .text()
                  .replace(/▢/g, "")
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

          Recipe.time.prep =
            $(".wprm-recipe-prep_time-minutes").text() +
            " " +
            $(".wprm-recipe-prep_timeunit-minutes").text();
          Recipe.time.cook =
            $(".wprm-recipe-cook_time-minutes").text() +
            " " +
            $(".wprm-recipe-cook_timeunit-minutes").text();
          Recipe.time.total =
            $(".wprm-recipe-total_time-minutes").text() +
            " " +
            $(".wprm-recipe-total_timeunit-minutes").text();
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

module.exports = gimmedelicious;
