const request = require("request");
const cheerio = require("cheerio");

const RecipeSchema = require("../helpers/recipe-schema");

const centralTexasFoodBank = url => {
  const Recipe = new RecipeSchema();
  return new Promise((resolve, reject) => {
    if (!url.includes("centraltexasfoodbank.org/recipe")) {
      reject(
        new Error(
          "url provided must include 'centraltexasfoodbank.org/recipe/'"
        )
      );
    } else {
      request(url, (error, response, html) => {
        if (!error && response.statusCode === 200) {
          const $ = cheerio.load(html);

          Recipe.image = $("img[typeof='foaf:Image']").attr("src");
          Recipe.name = $("h1.title")
            .text()
            .toLowerCase()
            .replace(/\b\w/g, l => l.toUpperCase());

          $(".ingredients-container")
            .find(".field-item")
            .each((i, el) => {
              Recipe.ingredients.push(
                $(el)
                  .text()
                  .trim()
              );
            });

          $(".bottom-section")
            .find("li")
            .each((i, el) => {
              Recipe.instructions.push($(el).text());
            });

          if (!Recipe.instructions.length) {
            let done = false;
            $(".bottom-section")
              .find("p")
              .each((i, el) => {
                if (!done && !$(el).children("strong").length) {
                  let instructions = $(el)
                    .text()
                    .trim()
                    .replace(/\s\s+/g, " ");
                  if (!instructions.length) done = true;
                  let instructionList = instructions
                    .replace(/\d+\.\s/g, "")
                    .split("\n")
                    .filter(instruction => !!instruction.length);
                  Recipe.instructions.push(...instructionList);
                }
              });
          }

          Recipe.time.prep = $(".field-name-field-prep-time")
            .find(".field-item")
            .text();
          Recipe.time.cook = $(".field-name-field-cooking-time")
            .find(".field-item")
            .text();
          Recipe.servings = $(".field-name-field-serves-")
            .find(".field-item")
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
        } else {
          reject(new Error("No recipe found on page"));
        }
      });
    }
  });
};

module.exports = centralTexasFoodBank;
