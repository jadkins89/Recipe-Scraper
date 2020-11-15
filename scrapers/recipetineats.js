const request = require("request");
const cheerio = require("cheerio");

const RecipeSchema = require("../helpers/recipe-schema");

const recipeTinEats = url => {
  const Recipe = new RecipeSchema();
  return new Promise((resolve, reject) => {
    if (!url.includes("recipetineats.com/")) {
      reject(new Error("url provided must include 'recipetineats.com/'"));
    } else {
      request(url, (error, response, html) => {
        if (!error && response.statusCode === 200) {
          const $ = cheerio.load(html);
          const body = $(".wprm-recipe-container");

          Recipe.image = $("meta[property='og:image']").attr("content");
          Recipe.name = $("meta[property='og:title']").attr("content");

          $(".wprm-recipe-ingredient").each((i, el) => {
            Recipe.ingredients.push(
              $(el)
                .text()
                .replace(/\s\s+/g, " ")
                .replace("▢", "")
                .trim()
            );
          });

          $(".wprm-recipe-instruction-group").each((i, el) => {
            Recipe.instructions.push(
              $(el)
                .children(".wprm-recipe-group-name")
                .text()
            );
            $(el)
              .find(".wprm-recipe-instruction-text")
              .each((i, elChild) => {
                Recipe.instructions.push($(elChild).text());
              });
          });

          $(".wprm-recipe-time-container").each((i, el) => {
            let text = $(el).text();
            if (text.includes("Prep:")) {
              Recipe.time.total = text.replace("Prep:", "").trim();
            } else if (text.includes("Cook:")) {
              Recipe.time.prep = text.replace("Cook:", "").trim();
            } else if (text.includes("Total:")) {
              Recipe.time.cook = text.replace("Total:", "").trim();
            }
          });

          Recipe.servings = $(".wprm-recipe-time")
            .first()
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

module.exports = recipeTinEats;
