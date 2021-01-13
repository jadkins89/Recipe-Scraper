"use strict";

const ScraperFactory = require("../helpers/ScraperFactory");

const recipeScraper = async url => {
  let klass = ScraperFactory.getScraper(url);
  return await klass.fetchRecipe();
};

recipeScraper(
  "https://www.bbcgoodfood.com/recipes/doughnut-muffins"
).then(recipe => console.log(recipe));

module.exports = recipeScraper;
