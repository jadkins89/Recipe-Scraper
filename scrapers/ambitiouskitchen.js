const cheerio = require("cheerio");

const RecipeSchema = require("./recipe-schema");
const puppeteerFetch = require("../puppeteerFetch");

const ambitiousKitchen = url => {
  return new Promise(async (resolve, reject) => {
    if (!url.includes("ambitiouskitchen.com")) {
      reject("url provided must include 'ambitiouskitchen.com'");
    } else {
      try {
        let html = await puppeteerFetch(url);
        var Recipe = new RecipeSchema();
        const $ = cheerio.load(html);

        Recipe.name = $('[itemprop="name"]').text();

        $('[itemprop="ingredients"]').each((i, el) => {
          const item = $(el)
            .text()
            .replace(/\s\s+/g, "");
          Recipe.ingredients.push(item);
        });

        $('[itemprop="recipeInstructions"]').each((i, el) => {
          const step = $(el)
            .text()
            .replace(/\s\s+/g, "");
          Recipe.instructions.push(step);
        });

        Recipe.time.prep = $("time[itemprop=prepTime]").text() || "";
        Recipe.time.cook = $("time[itemprop=cookTime]").text() || "";
        Recipe.time.ready = $("time[itemprop=totalTime]").text() || "";

        if (!Recipe.name || !Recipe.ingredients || !Recipe.instructions) {
          reject("No recipe found on page");
        }
        resolve(Recipe);
      } catch (error) {
        reject(error.message);
      }
    }
  });
};

module.exports = ambitiousKitchen;
