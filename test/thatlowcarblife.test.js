"use strict";
const commonRecipeTest = require("./helpers/commonRecipeTest");
const thatLowCarbLife = require("../scrapers/thatlowcarblife");
const Constants = require("./constants/thatlowcarblife");

commonRecipeTest(
  "thatLowCarbLife",
  thatLowCarbLife,
  Constants,
  "thatlowcarblife.com"
);
