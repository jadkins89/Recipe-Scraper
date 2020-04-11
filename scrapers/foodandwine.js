const request = require("request");
const cheerio = require("cheerio");

const RecipeSchema = require("../helpers/recipe-schema");

const foodAndWine = url => {
  const Recipe = new RecipeSchema();
  return new Promise((resolve, reject) => {
    if (!url.includes("foodandwine.com/recipes/")) {
      reject(new Error("url provided must include 'foodandwine.com/recipes/'"));
    } else {
      request(url, (error, response, html) => {
        if (!error && response.statusCode === 200) {
          const $ = cheerio.load(html);

          Recipe.image = $("meta[property='og:image']").attr("content");
          Recipe.name = $("h1.headline").text();

          $(".ingredients")
            .find("li")
            .each((i, el) => {
              Recipe.ingredients.push(
                $(el)
                  .text()
                  .trim()
              );
            });

          $(".recipe-instructions")
            .find("p")
            .each((i, el) => {
              Recipe.instructions.push($(el).text());
            });

          let metaBody = $(".recipe-meta-item-body");

          Recipe.time.active = metaBody
            .first()
            .text()
            .trim();
          Recipe.time.total = $(metaBody.get(1))
            .text()
            .trim();

          let servings = metaBody
            .last()
            .text()
            .trim();
          Recipe.servings = servings.slice(servings.indexOf(":") + 2);

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

module.exports = foodAndWine;
