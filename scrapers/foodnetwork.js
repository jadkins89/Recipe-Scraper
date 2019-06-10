const request = require('request');
const cheerio = require('cheerio');
const Recipe = require('./recipe-schema');

const foodNetwork = (url) => {
  return new Promise ((resolve, reject) => {
    request(url, (error, response, html) => {
      if (!error && response.statusCode == 200) {
        const $ = cheerio.load(html);
        
        Recipe.title = $('o-AssetTitle__a-HeadlineText').text();
        
        $('.o-Ingredients__a-Ingredient, .o-Ingredients__a-SubHeadline').each((i, el) => {
          const item = $(el).text().replace(/\s\s+/g, '');
          Recipe.ingredients.push(item);
        });
        
        $('.o-Method__m-Step').each((i, el) => {
          const step = $(el).text().replace(/\s\s+/g, '');
          if (step != '') {
            Recipe.instructions.push(step);
          }
        });
        
        $('.o-RecipeInfo li').each((i, el) => {
          let timeItem = $(el).text().replace(/\s\s+/g, '').split(':');
          switch (timeItem[0]) {
            case 'Prep':
              Recipe.time.prep = timeItem[1];
              break;
            case 'Active':
              Recipe.time.active = timeItem[1];
              break;
            case 'Inactive':
              Recipe.time.inactive = timeItem[1];
              break;
            case 'Cook':
              Recipe.time.cook = timeItem[1];
              break;
            case 'Total':
              Recipe.time.total = timeItem[1];
              break;
            default:
          }
        });
        
        resolve(Recipe);
      }
      else {
        reject(error);
      }
    });
  });
}

module.exports = foodNetwork;

