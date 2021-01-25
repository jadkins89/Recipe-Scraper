"use strict";

const ScraperFactory = require("../helpers/ScraperFactory");

const recipeScraper = async url => {
  let klass = new ScraperFactory().getScraper(url);
  return await klass.fetchRecipe();
};

module.exports = recipeScraper;
