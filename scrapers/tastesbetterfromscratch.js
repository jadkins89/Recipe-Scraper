const cheerio = require("cheerio");

const RecipeSchema = require("../helpers/recipe-schema");
const puppeteerFetch = require("../helpers/puppeteerFetch");

const tastesBetterFromScratch = url => {
  return new Promise(async (resolve, reject) => {
    if (!url.includes("tastesbetterfromscratch.com")) {
      reject(
        new Error("url provided must include 'tastesbetterfromscratch.com'")
      );
    } else {
      try {
        const html = await puppeteerFetch(url);
        const Recipe = new RecipeSchema();
        const $ = cheerio.load(html);

        Recipe.image = $("meta[property='og:image']").attr("content");
        Recipe.name = $(".wprm-recipe-name").text();

        $(".wprm-recipe-ingredient").each((i, el) => {
          let amount = $(el)
            .find(".wprm-recipe-ingredient-amount")
            .text();
          let unit = $(el)
            .find(".wprm-recipe-ingredient-unit")
            .text();
          let name = $(el)
            .find(".wprm-recipe-ingredient-name")
            .text();
          let ingredient = `${amount} ${unit} ${name}`
            .replace(/\s\s+/g, " ")
            .trim();
          Recipe.ingredients.push(ingredient);
        });

        $(".wprm-recipe-instruction").each((i, el) => {
          Recipe.instructions.push(
            $(el)
              .text()
              .replace(/\s\s+/g, "")
          );
        });

        $(".wprm-recipe-time-container").each((i, el) => {
          let text = $(el).text();
          if (text.includes("Total Time:")) {
            Recipe.time.total = text.replace("Total Time:", "").trim();
          } else if (text.includes("Prep Time:")) {
            Recipe.time.prep = text.replace("Prep Time:", "").trim();
          } else if (text.includes("Cook Time:")) {
            Recipe.time.cook = text.replace("Cook Time:", "").trim();
          }
        });

        Recipe.servings = $(".wprm-recipe-servings").text() || "";

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

module.exports = tastesBetterFromScratch;
