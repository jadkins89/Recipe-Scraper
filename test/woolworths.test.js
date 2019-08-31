"use strict";
const commonRecipeTest = require("./helpers/commonRecipeTest");
const woolworths = require("../scrapers/woolworths");
const Constants = require("./constants/woolworthsConstants");

commonRecipeTest(
  "woolworths",
  woolworths,
  Constants,
  "woolworths.com.au/shop/recipedetail/"
);
