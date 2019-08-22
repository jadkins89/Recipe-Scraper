"use strict";
const commonRecipeTest = require("./helpers/commonRecipeTest");
const oneHundredAndOne = require("../scrapers/101cookbooks");
const Constants = require("./constants/101cookbooksConstants");

commonRecipeTest(
  "101cookbooks",
  oneHundredAndOne,
  Constants,
  "101cookbooks.com/"
);
