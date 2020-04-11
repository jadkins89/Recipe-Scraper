const request = require("request");
const cheerio = require("cheerio");

const RecipeSchema = require("../helpers/recipe-schema");

const eatingWell = url => {
  const Recipe = new RecipeSchema();
  return new Promise((resolve, reject) => {
    if (!url.includes("eatingwell.com/recipe")) {
      reject(new Error("url provided must include 'eatingwell.com/recipe'"));
    } else {
      request(url, (error, response, html) => {
        if (!error && response.statusCode === 200) {
          const $ = cheerio.load(html);

          Recipe.image = $("meta[property='og:image']").attr("content");
          Recipe.name = $(".main-header")
            .find(".headline")
            .text()
            .trim();

          $(".ingredients-section__legend, .ingredients-item-name").each(
            (i, el) => {
              if (
                !$(el)
                  .attr("class")
                  .includes("visually-hidden")
              ) {
                Recipe.ingredients.push(
                  $(el)
                    .text()
                    .trim()
                    .replace(/\s\s+/g, " ")
                );
              }
            }
          );

          $(".instructions-section-item").each((i, el) => {
            Recipe.instructions.push(
              $(el)
                .find("p")
                .text()
            );
          });

          $(".recipe-meta-item").each((i, el) => {
            const title = $(el)
              .children(".recipe-meta-item-header")
              .text()
              .replace(/\s*:|\s+(?=\s*)/g, "");
            const value = $(el)
              .children(".recipe-meta-item-body")
              .text()
              .replace(/\s\s+/g, "");
            switch (title) {
              case "prep":
                Recipe.time.prep = value;
                break;
              case "cook":
                Recipe.time.cook = value;
                break;
              case "active":
                Recipe.time.active = value;
              case "total":
                Recipe.time.total = value;
                break;
              case "additional":
                Recipe.time.inactive = value;
                break;
              case "Servings":
                Recipe.servings = value;
                break;
              default:
                break;
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

module.exports = eatingWell;
