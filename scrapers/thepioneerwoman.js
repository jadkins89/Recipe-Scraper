const request = require("request");
const cheerio = require("cheerio");

const RecipeSchema = require("../helpers/recipe-schema");

const thePioneerWoman = url => {
  const Recipe = new RecipeSchema();
  return new Promise((resolve, reject) => {
    if (!url.includes("thepioneerwoman.com/cooking/")) {
      reject(
        new Error("url provided must include 'thepioneerwoman.com/cooking/'")
      );
    } else {
      request(url, (error, response, html) => {
        if (!error && response.statusCode === 200) {
          const $ = cheerio.load(html);

          Recipe.image = $("meta[property='og:image']").attr("content");
          Recipe.name = $(".recipe-hed")
            .first()
            .text();

          $(".ingredient-item").each((i, el) => {
            Recipe.ingredients.push(
              $(el)
                .text()
                .replace(/\s\s+/g, "")
            );
          });

          $(".direction-lists")
            .find("li")
            .each((i, el) => {
              if (el.type === "text") {
                Recipe.instructions.push(
                  $(el)
                    .text()
                    .trim()
                );
              }
            });

          if (!Recipe.instructions.length) {
            let directions = $(".direction-lists").text();
            let list = directions
              .split("\n")
              .filter(direction => !!direction.length);
            Recipe.instructions.push(...list);
          }

          let times = $(".recipe-summary-time").find("dd");
          Recipe.time.prep = times.first().text();
          Recipe.time.cook = $(times.get(2)).text();

          Recipe.servings = times.last().text();
          console.log(Recipe);
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

module.exports = thePioneerWoman;
