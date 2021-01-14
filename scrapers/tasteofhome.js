const request = require("request");
const cheerio = require("cheerio");

const RecipeSchema = require("../helpers/RecipeSchema");

const tasteofhome = url => {
  const Recipe = new RecipeSchema();
  return new Promise((resolve, reject) => {
    if (!url.includes("tasteofhome.com/recipes/")) {
      reject(new Error("url provided must include 'tasteofhome.com/recipes/'"));
    } else {
      request(url, (error, response, html) => {
        if (!error && response.statusCode === 200) {
          const $ = cheerio.load(html);

          Recipe.image = $("meta[property='og:image']").attr("content");
          Recipe.name = $("h1.recipe-title")
            .text()
            .trim();

          $("meta[property='article:tag']").each((i, el) => {
            Recipe.tags.push($(el).attr("content"));
          });

          $(".recipe-ingredients__list li").each((i, el) => {
            Recipe.ingredients.push($(el).text());
          });

          $(".recipe-directions__item").each((i, el) => {
            Recipe.instructions.push(
              $(el)
                .text()
                .trim()
            );
          });

          let timeStr = $(".recipe-time-yield__label-prep")
            .text()
            .split(/Bake:/g);
          Recipe.time.prep = timeStr[0].replace("Prep:", "").trim();
          Recipe.time.cook = (timeStr[1] || "").trim();
          Recipe.servings = $(".recipe-time-yield__label-servings")
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

module.exports = tasteofhome;
