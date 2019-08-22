"use strict";
const commonRecipeTest = require("./helpers/commonRecipeTest");
const foodNetwork = require("../scrapers/foodnetwork");
const Constants = require("./constants/foodnetworkConstants");

commonRecipeTest(
  "foodNetwork",
  foodNetwork,
  Constants,
  "foodnetwork.com/recipes/"
);
