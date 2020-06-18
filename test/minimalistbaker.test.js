"use strict";
const commonRecipeTest = require("./helpers/commonRecipeTest");
const minimalistBaker = require("../scrapers/minimalistbaker");
const Constants = require("./constants/minimalistbakerConstants");

commonRecipeTest(
  "minimalistbaker",
  minimalistBaker,
  Constants,
  "minimalistbaker.com/"
);
