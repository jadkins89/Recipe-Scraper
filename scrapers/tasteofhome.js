const request = require("request");
const cheerio = require("cheerio");

const RecipeSchema = require("../helpers/recipe-schema");

const tasteofhome = url => {
  const Recipe = new RecipeSchema();
  return new Promise((resolve, reject) => {
    if (!url.includes("tasteofhome.com/recipes")) {
      reject(new Error("url provided must include 'tasteofhome.com/recipes'"));
    } else {
      request(url, (error, response, html) => {
        if (!error && response.statusCode === 200) {
          const $ = cheerio.load(html);

          Recipe.name = $("h1.recipe-title")
            .text()
            .trim();

          $(".recipe-ingredients__list li").each((i, el) => {
            Recipe.ingredients.push($(el).text());
          });

          $(".recipe-directions__item").each((i, el) => {
            Recipe.instructions.push(
              $(el)
                .text()
                .replace(/\s\s+/g, "")
            );
          });

          Recipe.time.total = $(".recipe-time-yield__label-prep").text();
          Recipe.servings = $(".recipe-time-yield__label-servings").text();

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

module.exports = tasteofhome;
