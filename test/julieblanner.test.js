"use strict";
const commonRecipeTest = require("./helpers/commonRecipeTest");
const julieBlanner = require("../scrapers/julieblanner");
const Constants = require("./constants/julieblannerConstants");

commonRecipeTest("julieBlanner", julieBlanner, Constants, "julieblanner.com/");
