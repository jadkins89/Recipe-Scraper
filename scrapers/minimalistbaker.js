const request = require("request");
const cheerio = require("cheerio");

const RecipeSchema = require("../helpers/recipe-schema");

const minimalistBaker = url => {
  const Recipe = new RecipeSchema();
  return new Promise((resolve, reject) => {
    if (!url.includes("minimalistbaker.com/")) {
      reject(new Error("url provided must include 'minimalistbaker.com/'"));
    } else {
      request(url, (error, response, html) => {
        if (!error && response.statusCode === 200) {
          const $ = cheerio.load(html);
          const body = $(".wprm-recipe-container");

          Recipe.image = $("meta[property='og:image']").attr("content");
          Recipe.name = $(".wprm-recipe-name").text();

          $(".wprm-recipe-ingredient").each((i, el) => {
            Recipe.ingredients.push(
              $(el)
                .text()
                .replace(/\s\s+/g, " ")
                .trim()
            );
          });

          $(".wprm-recipe-instruction-group").each((i, el) => {
            let group = $(el)
              .children(".wprm-recipe-group-name")
              .text();
            if (group.length) Recipe.instructions.push(group);
            $(el)
              .find(".wprm-recipe-instruction-text")
              .each((i, elChild) => {
                Recipe.instructions.push($(elChild).text());
              });
          });

          Recipe.time.prep = $(".wprm-recipe-time")
            .first()
            .text();
          Recipe.time.cook = $($(".wprm-recipe-time").get(1)).text();
          Recipe.time.total = $(".wprm-recipe-time")
            .last()
            .text();

          Recipe.servings = $(".wprm-recipe-servings")
            .first()
            .text();

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

module.exports = minimalistBaker;
