const request = require("request");
const cheerio = require("cheerio");

const RecipeSchema = require("../helpers/recipe-schema");

const allRecipes = url => {
  const Recipe = new RecipeSchema();
  return new Promise((resolve, reject) => {
    if (!url.includes("allrecipes.com/recipe")) {
      reject(new Error("url provided must include 'allrecipes.com/recipe'"));
    } else {
      request(url, (error, response, html) => {
        if (!error && response.statusCode == 200) {
          const $ = cheerio.load(html);
          // Check if recipe is in new format
          if ((Recipe.name = $(".intro").text())) {
            newAllRecipes($, Recipe);
          } else if ((Recipe.name = $("#recipe-main-content").text())) {
            oldAllRecipes($, Recipe);
          } else {
            reject(new Error("No recipe found on page"));
          }
          resolve(Recipe);
        } else {
          reject(error);
        }
      });
    }
  });
};

const newAllRecipes = ($, Recipe) => {
  Recipe.name = Recipe.name.replace(/\s\s+/g, "");

  $(".recipe-meta-item").each((i, el) => {
    const title = $(el)
      .children(".recipe-meta-item-header")
      .text()
      .replace(/\s*:|\s+(?=\s*)/g, "");
    const value = $(el)
      .children(".recipe-meta-item-body")
      .text()
      .replace(/\s\s+/g, "");
    switch (title) {
      case "prep":
        Recipe.time.prep = value;
        break;
      case "cook":
        Recipe.time.cook = value;
        break;
      case "total":
        Recipe.time.total = value;
      case "additional":
        Recipe.time.inactive = value;
      default:
        return false;
    }
  });

  $(".ingredients-item").each((i, el) => {
    const ingredient = $(el)
      .text()
      .replace(/\s\s+/g, " ")
      .trim();
    Recipe.ingredients.push(ingredient);
  });
  $($(".instructions-section-item").find("p")).each((i, el) => {
    const instruction = $(el).text();
    Recipe.instructions.push(instruction);
  });
};

const oldAllRecipes = ($, Recipe) => {
  $("#polaris-app label").each((i, el) => {
    const item = $(el)
      .text()
      .replace(/\s\s+/g, "");
    if (item != "Add all ingredients to list" && item != "") {
      Recipe.ingredients.push(item);
    }
  });

  $(".step").each((i, el) => {
    const step = $(el)
      .text()
      .replace(/\s\s+/g, "");
    if (step != "") {
      Recipe.instructions.push(step);
    }
  });

  Recipe.time.prep = $("time[itemprop=prepTime]").text() || "";
  Recipe.time.cook = $("time[itemprop=cookTime]").text() || "";
  Recipe.time.ready = $("time[itemprop=totalTime]").text() || "";
};

module.exports = allRecipes;
