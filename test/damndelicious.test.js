"use strict";
const commonRecipeTest = require("./helpers/commonRecipeTest");
const damnDelicious = require("../scrapers/damndelicious");
const Constants = require("./constants/damndeliciousConstants");

commonRecipeTest(
  "damnDelicious",
  damnDelicious,
  Constants,
  "damndelicious.net"
);
