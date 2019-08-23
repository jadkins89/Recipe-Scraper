"use strict";
const commonRecipeTest = require("./helpers/commonRecipeTest");
const bbcGoodFood = require("../scrapers/bbcgoodfood");
const Constants = require("./constants/bbcgoodfoodConstants");

commonRecipeTest(
  "bbcGoodFood",
  bbcGoodFood,
  Constants,
  "bbcgoodfood.com/recipes/"
);
