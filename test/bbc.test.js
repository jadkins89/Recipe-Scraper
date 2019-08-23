"use strict";
const commonRecipeTest = require("./helpers/commonRecipeTest");
const bbc = require("../scrapers/bbc");
const Constants = require("./constants/bbcConstants");

commonRecipeTest("bbc", bbc, Constants, "bbc.co.uk/food/recipes/");
