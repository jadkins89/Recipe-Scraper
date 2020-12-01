const request = require("request");
const cheerio = require("cheerio");

const RecipeSchema = require("../helpers/recipe-schema");

const melskitchencafe = url => {
  const Recipe = new RecipeSchema();
  return new Promise((resolve, reject) => {
    if (!url.includes("melskitchencafe.com")) {
      reject(new Error("url provided must include 'melskitchencafe.com'"));
    } else {
      request(url, (error, response, html) => {
        if (!error && response.statusCode === 200) {
          const $ = cheerio.load(html);

          Recipe.image = $(".mv-create-image").attr("data-pin-media");
          Recipe.name = $(".mv-create-title-primary")
            .eq(0)
            .text()
            .trim();

          $("div.mv-create-ingredients ul li").each((i, el) => {
            Recipe.ingredients.push($(el).text());
          });

          $("div.mv-create-instructions ol li").each((i, el) => {
            Recipe.instructions.push(
              $(el)
                .text()
                .replace(/\s\s+/g, "")
            );
          });

          Recipe.time.prep = $(".mv-create-time-prep .mv-time-part").text();
          Recipe.time.total = $(".mv-create-time-total .mv-time-part").text();
          Recipe.servings = $(".mv-create-time-yield .mv-create-time-format").text();

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

module.exports = melskitchencafe;
