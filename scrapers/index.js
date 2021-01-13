"use strict";

const ScraperFactory = require("../helpers/ScraperFactory");

const recipeScraper = async url => {
  let klass = ScraperFactory.getScraper(url);
  return await klass.fetchRecipe();
};

recipeScraper(
  "https://www.centraltexasfoodbank.org/recipe/crock-pot-chicken-mole"
).then(recipe => console.log(recipe));

module.exports = recipeScraper;
