"use strict";
const commonRecipeTest = require("./helpers/commonRecipeTest");
const whatsGabyCooking = require("../scrapers/whatsgabycooking");
const Constants = require("./constants/whatsgabycookingConstants");

commonRecipeTest(
  "whatsGabyCooking",
  whatsGabyCooking,
  Constants,
  "whatsgabycooking.com/"
);
