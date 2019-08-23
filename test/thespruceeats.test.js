"use strict";
const commonRecipeTest = require("./helpers/commonRecipeTest");
const theSpruceEats = require("../scrapers/thespruceeats");
const Constants = require("./constants/thespruceeatsConstants");

commonRecipeTest(
  "theSpruceEats",
  theSpruceEats,
  Constants,
  "thespruceeats.com/"
);
