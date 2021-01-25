const request = require("request");
const cheerio = require("cheerio");

const RecipeSchema = require("../helpers/recipe-schema");

const theSpruceEats = url => {
  const Recipe = new RecipeSchema();
  return new Promise((resolve, reject) => {
    if (!url.includes("thespruceeats.com/")) {
      reject(new Error("url provided must include 'thespruceeats.com/'"));
    } else {
      request(url, (error, response, html) => {
        if (!error && response.statusCode === 200) {
          const $ = cheerio.load(html);

          Recipe.image = $("meta[property='og:image']").attr("content");
          Recipe.name = $(".heading__title").text();

          $(".simple-list__item").each((i, el) => {
            Recipe.ingredients.push(
              $(el)
                .text()
                .trim()
            );
          });

          $(".section--instructions")
            .find("li")
            .find("p.comp")
            .each((i, el) => {
              Recipe.instructions.push(
                $(el)
                  .text()
                  .trim()
              );
            });

          $(".recipe-search-suggestions__chip").each((i, el) => {
            Recipe.tags.push(
              $(el)
                .find("a")
                .text()
            );
          });

          let metaText = $(".meta-text").each((i, el) => {
            let text = $(el).text();
            if (text.includes("Prep:")) {
              Recipe.time.prep = text.replace("Prep: ", "").trim();
            } else if (text.includes("Cook: ")) {
              Recipe.time.cook = text.replace("Cook:", "").trim();
            } else if (text.includes("Total: ")) {
              Recipe.time.total = text.replace("Total:", "").trim();
            } else if (text.includes("Servings: ")) {
              Recipe.servings = text.replace("Servings: ", "").trim();
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

module.exports = theSpruceEats;
