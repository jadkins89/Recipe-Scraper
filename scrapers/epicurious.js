const request = require("request");
const cheerio = require("cheerio");
const RecipeSchema = require("./recipe-schema");

const epicurious = url => {
  var Recipe = new RecipeSchema();
  return new Promise((resolve, reject) => {
    request(url, (error, response, html) => {
      if (!error && response.statusCode == 200) {
        const $ = cheerio.load(html);

        Recipe.name = $("h1[itemprop=name]")
          .text()
          .trim();

        $(".ingredient").each((i, el) => {
          Recipe.ingredients.push($(el).text());
        });

        $(".preparation-step").each((i, el) => {
          Recipe.instructions.push(
            $(el)
              .text()
              .replace(/\s\s+/g, "")
          );
        });

        Recipe.time.active = $("dd.active-time").text();
        Recipe.time.total = $("dd.total-time").text();

        Recipe.servings = $("dd.yield").text();

        resolve(Recipe);
      } else {
        reject(error);
      }
    });
  });
};

module.exports = epicurious;
