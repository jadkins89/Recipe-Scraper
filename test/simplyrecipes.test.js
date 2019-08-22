"use strict";
const commonRecipeTest = require("./helpers/commonRecipeTest");
const simplyRecipes = require("../scrapers/simplyrecipes");
const Constants = require("./constants/simplyrecipesConstants");

commonRecipeTest(
  "simplyRecipes",
  simplyRecipes,
  Constants,
  "simplyrecipes.com/recipes/"
);
