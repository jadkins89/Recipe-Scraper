"use strict";
const commonRecipeTest = require("./helpers/commonRecipeTest");
const closetCooking = require("../scrapers/closetcooking");
const Constants = require("./constants/closetcookingConstants");

commonRecipeTest(
  "closetCooking",
  closetCooking,
  Constants,
  "closetcooking.com/"
);
