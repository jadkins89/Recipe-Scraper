const cheerio = require("cheerio");

const RecipeSchema = require("../helpers/recipe-schema");
const puppeteerFetch = require("../helpers/puppeteerFetch");

const ambitiousKitchen = url => {
  return new Promise(async (resolve, reject) => {
    if (!url.includes("ambitiouskitchen.com")) {
      reject(new Error("url provided must include 'ambitiouskitchen.com'"));
    } else {
      try {
        const html = await puppeteerFetch(url);
        const Recipe = new RecipeSchema();
        const $ = cheerio.load(html);

        Recipe.name = $('[itemprop="name"]').text();

        $('[itemprop="ingredients"]').each((i, el) => {
          Recipe.ingredients.push(
            $(el)
              .text()
              .replace(/\s\s+/g, "")
          );
        });

        $('[itemprop="recipeInstructions"]').each((i, el) => {
          Recipe.instructions.push(
            $(el)
              .text()
              .replace(/\s\s+/g, "")
          );
        });

        Recipe.time.prep = $("time[itemprop=prepTime]").text() || "";
        Recipe.time.cook = $("time[itemprop=cookTime]").text() || "";
        Recipe.time.ready = $("time[itemprop=totalTime]").text() || "";

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
        reject(new Error("There was a problem retrieving the page"));
      }
    }
  });
};

module.exports = ambitiousKitchen;
