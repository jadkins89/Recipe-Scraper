const request = require("request");
const cheerio = require("cheerio");

const RecipeSchema = require("../helpers/recipe-schema");
const puppeteerFetch = require("../helpers/puppeteerFetch");

const theRealFoodRds = url => {
  const Recipe = new RecipeSchema();
  return new Promise(async (resolve, reject) => {
    if (!url.includes("therealfoodrds.com/")) {
      reject(new Error("url provided must include 'therealfoodrds.com/'"));
    } else {
      try {
        const html = await puppeteerFetch(url);
        const Recipe = new RecipeSchema();
        const $ = cheerio.load(html);

        Recipe.image = $("meta[property='og:image']").attr("content");
        Recipe.name = $(".tasty-recipes-entry-header")
          .children("h2")
          .first()
          .text();

        $(".tasty-recipes-ingredients")
          .find("li")
          .each((i, el) => {
            Recipe.ingredients.push(
              $(el)
                .text()
                .replace(/\s\s+/g, "")
            );
          });

        $(".tasty-recipes-instructions")
          .find("h4, li")
          .each((i, el) => {
            Recipe.instructions.push(
              $(el)
                .text()
                .replace(/\s\s+/g, "")
            );
          });

        Recipe.time.prep = $(".tasty-recipes-prep-time").text();
        Recipe.time.cook = $(".tasty-recipes-cook-time").text();
        Recipe.time.total = $(".tasty-recipes-total-time").text();

        Recipe.servings = $(".tasty-recipes-yield")
          .children("span")
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
      } catch (error) {
        reject(new Error("No recipe found on page"));
      }
    }
  });
};

module.exports = theRealFoodRds;
