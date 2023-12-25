"use strict";

import ScraperFactory from '../helpers/ScraperFactory.js';

const recipeScraper = async url => {
  let klass = new ScraperFactory().getScraper(url);
  return await klass.fetchRecipe();
};

export default recipeScraper;
