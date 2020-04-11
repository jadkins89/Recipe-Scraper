const request = require("request");
const cheerio = require("cheerio");

const RecipeSchema = require("../helpers/recipe-schema");

const myRecipes = url => {
  const Recipe = new RecipeSchema();
  return new Promise((resolve, reject) => {
    if (!url.includes("myrecipes.com/recipe")) {
      reject(new Error("url provided must include 'myrecipes.com/recipe'"));
    } else {
      request(url, (error, response, html) => {
        if (!error && response.statusCode === 200) {
          const $ = cheerio.load(html);

          Recipe.image = $("meta[property='og:image']").attr("content");
          Recipe.name = $("h1.headline")
            .text()
            .trim();

          $(".ingredients")
            .find("h2, li")
            .each((i, el) => {
              Recipe.ingredients.push($(el).text());
            });

          $(".step")
            .find("p")
            .each((i, el) => {
              const step = $(el)
                .text()
                .replace(/\s\s+/g, "");
              Recipe.instructions.push(step);
            });

          let metaBody = $(".recipe-meta-item-body");

          Recipe.time.active = metaBody
            .first()
            .text()
            .trim();
          Recipe.time.total = $(metaBody.get(1))
            .text()
            .trim();

          Recipe.servings = metaBody
            .last()
            .text()
            .trim();

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

module.exports = myRecipes;
