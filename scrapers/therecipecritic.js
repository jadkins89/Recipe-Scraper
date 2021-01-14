const request = require("request");
const cheerio = require("cheerio");

const RecipeSchema = require("../helpers/RecipeSchema");

const therecipecritic = url => {
  const Recipe = new RecipeSchema();
  return new Promise((resolve, reject) => {
    if (!url.includes("therecipecritic.com/")) {
      reject(new Error("url provided must include 'therecipecritic.com/'"));
    } else {
      request(url, (error, response, html) => {
        if (!error && response.statusCode === 200) {
          const $ = cheerio.load(html);
          const textTrim = el => el.text().trim();

          Recipe.image = $("meta[property='og:image']").attr("content");
          Recipe.name = textTrim($(".wprm-recipe-name"));

          $(".wprm-recipe-ingredient").each((i, el) => {
            Recipe.ingredients.push(textTrim($(el)).replace(/\s\s+/g, " "));
          });

          $(".wprm-recipe-instruction-text").each((i, el) => {
            Recipe.instructions.push(textTrim($(el)).replace(/\s\s+/g, " "));
          });

          $(".wprm-recipe-details-name").remove();

          Recipe.time.prep = textTrim($(".wprm-recipe-prep-time-container"));
          Recipe.time.cook = textTrim($(".wprm-recipe-cook-time-container"));
          Recipe.time.inactive = textTrim(
            $(".wprm-recipe-custom-time-container")
          );
          Recipe.time.total = textTrim($(".wprm-recipe-total-time-container"));
          Recipe.servings = $(
            ".wprm-recipe-servings-container .wprm-recipe-servings"
          ).text();

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
