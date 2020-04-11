const request = require("request");
const cheerio = require("cheerio");

const RecipeSchema = require("../helpers/recipe-schema");

const epicurious = url => {
  const Recipe = new RecipeSchema();
  return new Promise((resolve, reject) => {
    if (!url.includes("epicurious.com/recipes/")) {
      reject(new Error("url provided must include 'epicurious.com/recipes/'"));
    } else {
      request(url, (error, response, html) => {
        if (!error && response.statusCode === 200) {
          const $ = cheerio.load(html);

          Recipe.image = $("meta[property='og:image']").attr("content");
          Recipe.name = $("h1[itemprop=name]")
            .text()
            .trim();

          $(".ingredient").each((i, el) => {
            Recipe.ingredients.push($(el).text());
          });

          $(".preparation-step").each((i, el) => {
            Recipe.instructions.push(
              $(el)
                .text()
                .replace(/\s\s+/g, "")
            );
          });

          Recipe.time.active = $("dd.active-time").text();
          Recipe.time.total = $("dd.total-time").text();

          Recipe.servings = $("dd.yield").text();

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

module.exports = epicurious;
