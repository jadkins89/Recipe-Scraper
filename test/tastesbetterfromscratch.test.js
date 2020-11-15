"use strict";
const commonRecipeTest = require("./helpers/commonRecipeTest");
const tastesBetterFromScratch = require("../scrapers/tastesbetterfromscratch");
const Constants = require("./constants/tastebetterfromscratchConstants");

commonRecipeTest(
  "tastesBetterFromScratch",
  tastesBetterFromScratch,
  Constants,
  "tastesbetterfromscratch.com"
);
