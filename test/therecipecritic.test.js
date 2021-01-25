"use strict";
const commonRecipeTest = require("./helpers/commonRecipeTest");
const theRecipeCritic = require("../scrapers/therecipecritic");
const Constants = require("./constants/therecipecriticConstants");

commonRecipeTest(
  "theRecipeCritic",
  theRecipeCritic,
  Constants,
  "therecipecritic.com/"
);
