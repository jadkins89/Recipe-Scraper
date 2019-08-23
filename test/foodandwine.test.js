"use strict";
const commonRecipeTest = require("./helpers/commonRecipeTest");
const foodAndWine = require("../scrapers/foodandwine");
const Constants = require("./constants/foodandwineConstants");

commonRecipeTest(
  "foodAndWine",
  foodAndWine,
  Constants,
  "foodandwine.com/recipes/"
);
