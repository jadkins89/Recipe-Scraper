"use strict";

const ScraperFactory = require("../helpers/ScraperFactory");

const recipeScraper = async url => {
  let klass = ScraperFactory.getScraper(url);
  return await klass.fetchRecipe();
};

recipeScraper(
  "https://www.closetcooking.com/reina-pepiada-arepa-chicken-and-avocado-sandwich/"
).then(recipe => console.log(recipe));

module.exports = recipeScraper;
