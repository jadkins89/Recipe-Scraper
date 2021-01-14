"use strict";
const commonRecipeTest = require("./helpers/commonRecipeTest");
const constants = require("./constants/centraltexasfoodbankConstants");

commonRecipeTest(
  "centralTexasFoodBank",
  constants,
  "centraltexasfoodbank.org/recipe"
);
