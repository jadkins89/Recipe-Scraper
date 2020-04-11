const request = require("request");
const cheerio = require("cheerio");

const RecipeSchema = require("../helpers/recipe-schema");

const fineCooking = url => {
  const Recipe = new RecipeSchema();
  return new Promise((resolve, reject) => {
    if (!url.includes("finecooking.com/recipe")) {
      reject(new Error("url provided must include 'finecooking.com/recipe'"));
    } else {
      request(url, (error, response, html) => {
        if (!error && response.statusCode === 200) {
          const $ = cheerio.load(html);

          Recipe.image = $("meta[property='og:image']").attr("content");
          Recipe.name = $(".recipe__title").text();

          $(".recipe__nutrition").remove();
          $(".recipe__ingredients")
            .find("h3, li")
            .each((i, el) => {
              Recipe.ingredients.push($(el).text());
            });

          $(".wide-tags-container").remove();
          $(".recipe__preparation")
            .find("h3, li")
            .each((i, el) => {
              Recipe.instructions.push($(el).text());
            });

          Recipe.time.prep = $(".recipe-metadata__prep-time")
            .first()
            .text();
          Recipe.time.cook = $(".recipe-metadata__cook-time")
            .first()
            .text();

          $(".recipe__yield__heading").remove();
          Recipe.servings = $(".recipe__yield").text();

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

module.exports = fineCooking;
