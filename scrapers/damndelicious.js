const cheerio = require("cheerio");

const RecipeSchema = require("../helpers/recipe-schema");
const puppeteerFetch = require("../helpers/puppeteerFetch");

const damnDelicious = url => {
  return new Promise(async (resolve, reject) => {
    if (!url.includes("damndelicious.net")) {
      reject(new Error("url provided must include 'damndelicious.net'"));
    } else {
      try {
        const html = await puppeteerFetch(url);
        const Recipe = new RecipeSchema();
        const $ = cheerio.load(html);

        let titleDiv = $(".recipe-title");

        Recipe.image = $("meta[property='og:image']").attr("content");
        Recipe.name = $(titleDiv)
          .children("h2")
          .text();

        $(titleDiv)
          .find("p")
          .each((i, el) => {
            let title = $(el)
              .children("strong")
              .text();
            let data = $(el)
              .children("span")
              .text();

            switch (title) {
              case "Yield:":
                Recipe.servings = data;
                break;
              case "prep time:":
                Recipe.time.prep = data;
                break;
              case "cook time:":
                Recipe.time.cook = data;
                break;
              case "total time:":
                Recipe.time.total = data;
                break;
              default:
                break;
            }
          });

        $("li[itemprop=ingredients]").each((i, el) => {
          Recipe.ingredients.push($(el).text());
        });

        $(".instructions")
          .find("li")
          .each((i, el) => {
            Recipe.instructions.push($(el).text());
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
      } catch (error) {
        reject(new Error("No recipe found on page"));
      }
    }
  });
};

module.exports = damnDelicious;
