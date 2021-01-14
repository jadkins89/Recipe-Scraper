"use strict";

const ScraperFactory = require("../helpers/ScraperFactory");

const recipeScraper = async url => {
  let klass = ScraperFactory.getScraper(url);
  return await klass.fetchRecipe();
};

recipeScraper(
  "https://www.epicurious.com/recipes/food/views/trout-toast-with-soft-scrambled-eggs"
).then(recipe => console.log(recipe));

module.exports = recipeScraper;
