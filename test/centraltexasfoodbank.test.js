"use strict";
const commonRecipeTest = require("./helpers/commonRecipeTest");
const centralTexasFoodBank = require("../scrapers/centraltexasfoodbank");
const Constants = require("./constants/centraltexasfoodbankConstants");

commonRecipeTest(
  "centralTexasFoodBank",
  centralTexasFoodBank,
  Constants,
  "centraltexasfoodbank.org/recipe/"
);
