"use strict";
const commonRecipeTest = require("./helpers/commonRecipeTest");
const melsKitchenCafe = require("../scrapers/melskitchencafe");
const Constants = require("./constants/melskitchencafeConstants");

commonRecipeTest(
  "melsKitchenCafe",
  melsKitchenCafe,
  Constants,
  "melskitchencafe.com/"
);
