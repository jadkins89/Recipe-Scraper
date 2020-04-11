const request = require("request");
const cheerio = require("cheerio");

const RecipeSchema = require("../helpers/recipe-schema");

const whatsGabyCooking = url => {
  const Recipe = new RecipeSchema();
  return new Promise((resolve, reject) => {
    if (!url.includes("whatsgabycooking.com/")) {
      reject(new Error("url provided must include 'whatsgabycooking.com/'"));
    } else {
      request(url, (error, response, html) => {
        if (!error && response.statusCode === 200) {
          const $ = cheerio.load(html);

          Recipe.image = $("meta[property='og:image']").attr("content");
          Recipe.name = $(".recipe-header").text();

          $(".wprm-recipe-ingredient").each((i, el) => {
            let elText = $(el)
              .text()
              .trim();
            if (elText.length) {
              Recipe.ingredients.push(elText);
            }
          });

          $(".wprm-recipe-instruction-group").each((i, el) => {
            let groupName = $(el)
              .find(".wprm-recipe-group-name")
              .text();
            let instruction = $(el)
              .find(".wprm-recipe-instruction-text")
              .text();
            if (groupName) {
              Recipe.instructions.push(groupName);
            }
            Recipe.instructions.push(instruction);
          });

          $(".recipe-info")
            .children(".row")
            .each((i, el) => {
              let recipeInfo = $(el).text();
              let infoData = $(el)
                .find(".recipe-data")
                .text();
              if (recipeInfo.includes("Servings:")) {
                Recipe.servings = infoData;
              } else if (recipeInfo.includes("Prep Time:")) {
                Recipe.time.prep = infoData;
              } else if (recipeInfo.includes("Cook Time:")) {
                Recipe.time.cook = infoData;
              } else if (recipeInfo.includes("Total Time:")) {
                Recipe.time.total = infoData;
              }
            });
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

module.exports = whatsGabyCooking;
