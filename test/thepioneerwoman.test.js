"use strict";
const commonRecipeTest = require("./helpers/commonRecipeTest");
const thePioneerWoman = require("../scrapers/thepioneerwoman");
const Constants = require("./constants/thepioneerwomanConstants");

commonRecipeTest(
  "thePioneerWoman",
  thePioneerWoman,
  Constants,
  "thepioneerwoman.com/food-cooking/"
);
