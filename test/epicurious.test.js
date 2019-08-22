"use strict";
const commonRecipeTest = require("./helpers/commonRecipeTest");
const epicurious = require("../scrapers/epicurious");
const Constants = require("./constants/epicuriousConstants");

commonRecipeTest(
  "epicurious",
  epicurious,
  Constants,
  "epicurious.com/recipes/"
);
