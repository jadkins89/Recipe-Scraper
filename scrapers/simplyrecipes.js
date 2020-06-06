const request = require("request");
const cheerio = require("cheerio");

const RecipeSchema = require("../helpers/recipe-schema");

const simplyRecipes = url => {
  const Recipe = new RecipeSchema();
  return new Promise((resolve, reject) => {
    if (!url.includes("simplyrecipes.com/recipes/")) {
      reject(
        new Error("url provided must include 'simplyrecipes.com/recipes/'")
      );
    } else {
      request(url, (error, response, html) => {
        if (!error && response.statusCode === 200) {
          const $ = cheerio.load(html);

          Recipe.image = $("meta[property='og:image']").attr("content");
          Recipe.name = $(".recipe-callout")
            .children("h2")
            .text();

          $(".recipe-ingredients")
            .find("li.ingredient, p")
            .each((i, el) => {
              Recipe.ingredients.push($(el).text());
            });

          $(".instructions")
            .find("p")
            .each((i, el) => {
              let curEl = $(el).text();
              if (curEl) {
                Recipe.instructions.push(curEl.replace(/^\d+\s/, ""));
              }
            });

          Recipe.time.prep = $(".preptime").text();
          Recipe.time.cook = $(".cooktime").text();

          Recipe.servings = $(".yield").text();
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

module.exports = simplyRecipes;
