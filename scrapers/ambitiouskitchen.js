const cheerio = require("cheerio");

const RecipeSchema = require("./recipe-schema");
const puppeteerFetch = require("../puppeteerFetch");

const ambitiousKitchen = async url => {
  try {
    let html = await puppeteerFetch(url);
    var Recipe = new RecipeSchema();
    return new Promise((resolve, reject) => {
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

      resolve(Recipe);
    });
  } catch (error) {
    reject(error);
  }
};

module.exports = ambitiousKitchen;
