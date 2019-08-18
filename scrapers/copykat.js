const cheerio = require("cheerio");

const RecipeSchema = require("./recipe-schema");
const puppeteerFetch = require("../puppeteerFetch");

const copykat = async url => {
  try {
    let html = await puppeteerFetch(url);
    var Recipe = new RecipeSchema();
    return new Promise((resolve, reject) => {
      const $ = cheerio.load(html);

      Recipe.name = $(
        $(".wprm-recipe-container").find(".wprm-recipe-name")
      ).text();

      $(".wprm-recipe-ingredient").each((i, el) => {
        Recipe.ingredients.push(
          $(el)
            .text()
            .replace(/\s\s+/g, " ")
            .trim()
        );
      });

      $(".wprm-recipe-instructions").each((i, el) => {
        Recipe.instructions.push(
          $(el)
            .text()
            .replace(/\s\s+/g, " ")
            .trim()
        );
      });

      Recipe.time.prep = $(
        $(".wprm-recipe-prep-time-container").children(".wprm-recipe-time")
      ).text();
      Recipe.time.cook = $(
        $(".wprm-recipe-cook-time-container").children(".wprm-recipe-time")
      ).text();
      Recipe.time.total = $(
        $(".wprm-recipe-total-time-container").children(".wprm-recipe-time")
      ).text();

      Recipe.servings = $(".wprm-recipe-servings").text();

      resolve(Recipe);
    });
  } catch (error) {
    reject(error);
  }
};

module.exports = copykat;
