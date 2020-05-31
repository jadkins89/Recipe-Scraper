"use strict";
const commonRecipeTest = require("./helpers/commonRecipeTest");
const omnivoresCookbook = require("../scrapers/omnivorescookbook");
const Constants = require("./constants/omnivorescookbookConstants");

commonRecipeTest(
  "omnivorescookbook",
  omnivoresCookbook,
  Constants,
  "omnivorescookbook.com/"
);
