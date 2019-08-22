"use strict";
const commonRecipeTest = require("./helpers/commonRecipeTest");
const theRealDealFoodRds = require("../scrapers/therealfoodrds");
const Constants = require("./constants/therealdealfoodrdsConstants");

commonRecipeTest(
  "theRealDealFoodRds",
  theRealDealFoodRds,
  Constants,
  "therealfoodrds.com/"
);
