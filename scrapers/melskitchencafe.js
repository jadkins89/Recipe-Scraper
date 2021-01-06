const request = require("request");
const cheerio = require("cheerio");

const RecipeSchema = require("../helpers/recipe-schema");

const melskitchencafe = url => {
  const Recipe = new RecipeSchema();
  return new Promise((resolve, reject) => {
    if (!url.includes("melskitchencafe.com")) {
      reject(new Error("url provided must include 'melskitchencafe.com'"));
    } else {
      request(url, (error, response, html) => {
        if (!error && response.statusCode === 200) {
          const $ = cheerio.load(html);

          const textTrim = el => el.text().trim();

          Recipe.image = $("meta[property='og:image']").attr("content");
          Recipe.name = textTrim(
            $(".wp-block-mv-recipe .mv-create-title-primary")
          );

          $("div.mv-create-ingredients ul li").each((i, el) => {
            Recipe.ingredients.push(textTrim($(el)));
          });

          $("div.mv-create-instructions ol li").each((i, el) => {
            Recipe.instructions.push(textTrim($(el)));
          });

          Recipe.time.prep = textTrim(
            $(".mv-create-time-prep .mv-create-time-format")
          );
          Recipe.time.cook = textTrim(
            $(".mv-create-time-active .mv-create-time-format")
          );
          Recipe.time.inactive = textTrim(
            $(".mv-create-time-additional .mv-create-time-format")
          );
          Recipe.time.total = textTrim(
            $(".mv-create-time-total .mv-create-time-format")
          );
          Recipe.servings = textTrim(
            $(".mv-create-time-yield .mv-create-time-format")
          );

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

module.exports = melskitchencafe;
