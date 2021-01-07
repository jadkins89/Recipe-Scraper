"use strict";
const commonRecipeTest = require("./helpers/commonRecipeTest");
const gimmeDelicious = require("../scrapers/gimmedelicious");
const Constants = require("./constants/gimmedeliciousConstants");

commonRecipeTest(
  "gimmeDelicious",
  gimmeDelicious,
  Constants,
  "gimmedelicious.com/"
);
