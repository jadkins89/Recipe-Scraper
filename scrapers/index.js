"use strict";

const ScraperFactory = require("../helpers/ScraperFactory");

const recipeScraper = async url => {
  let klass = ScraperFactory.getScraper(url);
  return await klass.fetchRecipe();
};

recipeScraper(
  "https://www.yummly.com/recipe/No-Bake-Lemon-Mango-Cheesecakes-with-Speculoos-crust-781945"
).then(recipe => console.log(recipe));

module.exports = recipeScraper;
