"use strict";

const ScraperFactory = require("../helpers/ScraperFactory");

const recipeScraper = async url => {
  let klass = ScraperFactory.getScraper(url);
  return await klass.fetchRecipe();
};

recipeScraper(
  "https://www.ambitiouskitchen.com/street-corn-pasta-salad-with-cilantro-pesto-goat-cheese/"
).then(recipe => console.log(recipe));

module.exports = recipeScraper;
