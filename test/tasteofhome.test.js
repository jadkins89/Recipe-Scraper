"use strict";
const commonRecipeTest = require("./helpers/commonRecipeTest");
const tasteOfHome = require("../scrapers/tasteofhome");
const Constants = require("./constants/tasteofhomeConstants");

commonRecipeTest(
  "tasteOfHome",
  tasteOfHome,
  Constants,
  "tasteofhome.com/recipes/"
);
