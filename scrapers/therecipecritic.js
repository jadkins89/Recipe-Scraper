const request = require("request");
const cheerio = require("cheerio");

const RecipeSchema = require("../helpers/recipe-schema");

const therecipecritic = url => {
  const Recipe = new RecipeSchema();
  return new Promise((resolve, reject) => {
    if (!url.includes("therecipecritic.com")) {
      reject(new Error("url provided must include 'therecipecritic.com'"));
    } else {
      request(url, (error, response, html) => {
        if (!error && response.statusCode === 200) {
          const $ = cheerio.load(html);

          Recipe.image = $(".wprm-recipe-image img").attr("src");
          Recipe.name = $(".wprm-recipe-name")
            .text()
            .trim();

          $(".wprm-recipe-ingredient").each((i, el) => {
            Recipe.ingredients.push($(el).text());
          });

          $(".wprm-recipe-instruction-text").each((i, el) => {
            Recipe.instructions.push(
              $(el)
                .text()
                .replace(/\s\s+/g, "")
            );
          });

          Recipe.time.total = $(".recipe-time-yield__label-prep").text();
          Recipe.time.prep = $(".wprm-recipe-prep_time").text() + ' ' + $(".wprm-recipe-prep_timeunit-minutes").text();
          Recipe.time.total = $(".wprm-recipe-total_time").text() + ' ' + $(".wprm-recipe-total_timeunit-minutes").text();
          Recipe.servings = $(".wprm-recipe-servings").text(); + ' ' + $(".wprm-recipe-servings-unit").text()

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

module.exports = therecipecritic;
