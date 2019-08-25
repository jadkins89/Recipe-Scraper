"use strict";
const commonRecipeTest = require("./helpers/commonRecipeTest");
const fineCooking = require("../scrapers/finecooking");
const Constants = require("./constants/finecookingConstants");

commonRecipeTest(
  "fineCooking",
  fineCooking,
  Constants,
  "finecooking.com/recipe"
);
