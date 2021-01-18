const request = require("request");
const cheerio = require("cheerio");

const RecipeSchema = require("../helpers/recipe-schema");

const simplyRecipes = url => {
    const Recipe = new RecipeSchema();
    return new Promise((resolve, reject) => {
        if (!url.includes("thatlowcarblife.com")) {
            reject(
                new Error("url provided must include 'thatlowcarblife.com'")
            );
        } else {
            request(url, (error, response, html) => {
                if (!error && response.statusCode === 200) {
                    const $ = cheerio.load(html);


                    Recipe.image = $("meta[property='og:image']").attr("content");
                    Recipe.name = $(".mv-create-title-primary").text();

                    $(".mv-create-ingredients")
                        .children("ul")
                        .children('li')
                        .each((i, el) => {
                            // They added a '\n' character for some reason, gotta remove it!
                            Recipe.ingredients.push($(el).text().replace('\n', ''));
                        });

                    var instructions = $('.mv-create-instructions');
                    
                    instructions.children('ol').children('li').each((i, el) => {
                        Recipe.instructions.push($(el).text());
                    });


                } else {
                    reject(new Error("No recipe found on page"));
                }
            });
        }
    });
};

module.exports = simplyRecipes;