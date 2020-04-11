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

          $(".section-content")
            .find("ol")
            .find("p")
            .each((i, el) => {
              Recipe.instructions.push($(el).text());
            });

          let metaText = $(".meta-text__data");
          Recipe.time.total = metaText.first().text();
          Recipe.time.prep = $(metaText.get(1)).text();
          Recipe.time.cook = $(metaText.get(2)).text();

          Recipe.servings = metaText.last().text();

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
