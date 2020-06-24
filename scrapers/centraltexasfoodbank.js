const request = require("request");
const cheerio = require("cheerio");

const RecipeSchema = require("../helpers/recipe-schema");
const baseUrl = "https://www.centraltexasfoodbank.org";

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

          Recipe.image = baseUrl + $("img[typeof='foaf:Image']").prop("src");
          Recipe.name = $("#block-basis-page-title")
            .find("span")
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

          // Try a different pattern if first one fails
          if (!Recipe.ingredients.length) {
            $(".field-name-field-ingredients")
              .children("div")
              .children("div")
              .each((i, el) => {
                Recipe.ingredients.push(
                  $(el)
                    .text()
                    .trim()
                );
              });
          }

          $(".bottom-section")
            .find("li")
            .each((i, el) => {
              Recipe.instructions.push($(el).text());
            });

          // Try a different pattern if first one fails
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
            .find("div")
            .text();
          Recipe.time.cook = $(".field-name-field-cooking-time")
            .find("div")
            .text();
          Recipe.servings = $(".field-name-field-serves-")
            .find("div")
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
