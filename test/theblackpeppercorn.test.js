"use strict";
const commonRecipeTest = require("./helpers/commonRecipeTest");
const theBlackPeppercorn = require("../scrapers/theblackpeppercorn");
const Constants = require("./constants/theblackpeppercornConstants");

commonRecipeTest(
  "theBlackPeppercorn",
  theBlackPeppercorn,
  Constants,
  "theblackpeppercorn.com/"
);
