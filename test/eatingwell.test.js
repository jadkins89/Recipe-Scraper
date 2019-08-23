"use strict";
const commonRecipeTest = require("./helpers/commonRecipeTest");
const eatingWell = require("../scrapers/eatingwell");
const Constants = require("./constants/eatingwellConstants");

commonRecipeTest("eatingWell", eatingWell, Constants, "eatingwell.com/recipe/");
