"use strict";
const commonRecipeTest = require("./helpers/commonRecipeTest");
const gimmeSomeOven = require("../scrapers/gimmesomeoven");
const Constants = require("./constants/gimmesomeovenConstants");

commonRecipeTest(
  "gimmeSomeOven",
  gimmeSomeOven,
  Constants,
  "gimmesomeoven.com/"
);
