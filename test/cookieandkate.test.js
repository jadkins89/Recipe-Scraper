"use strict";
const commonRecipeTest = require("./helpers/commonRecipeTest");
const cookieAndKate = require("../scrapers/cookieandkate");
const Constants = require("./constants/cookieandkateConstants");

commonRecipeTest(
  "cookieAndKate",
  cookieAndKate,
  Constants,
  "cookieandkate.com/"
);
