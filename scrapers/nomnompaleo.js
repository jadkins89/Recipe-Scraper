const cheerio = require("cheerio");

const RecipeSchema = require("../helpers/recipe-schema");
const puppeteerFetch = require("../helpers/puppeteerFetch");

const nomNomPaleo = url => {
  return new Promise(async (resolve, reject) => {
    if (!url.includes("nomnompaleo.com/")) {
      reject(new Error("url provided must include 'nomnompaleo.com/'"));
    } else {
      try {
        const html = await puppeteerFetch(url);
        const Recipe = new RecipeSchema();
        const $ = cheerio.load(html);

        Recipe.image = $("meta[property='og:image']").attr("content");
        Recipe.name = $(".wprm-recipe-name").text();

        $(".wprm-recipe-ingredient").each((i, el) => {
          Recipe.ingredients.push(
            $(el)
              .text()
              .replace(/\s\s+/g, " ")
              .trim()
          );
        });

        $(".wprm-recipe-instruction-group").each((i, el) => {
          let groupName = $(el)
            .children(".wprm-recipe-group-name")
            .text();
          if (groupName.length) {
            Recipe.instructions.push(groupName);
          }
          $(el)
            .find(".wprm-recipe-instruction-text")
            .each((i, elChild) => {
              Recipe.instructions.push($(elChild).text());
            });
        });
        const times = $(".wprm-recipe-time");
        Recipe.time.prep = $(times.first()).text();
        Recipe.time.cook = $(times.get(1)).text();
        Recipe.time.total = $(times.last()).text();

        Recipe.servings = $(".wprm-recipe-servings-with-unit").text();

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

module.exports = nomNomPaleo;
