"use strict";
const commonRecipeTest = require("./helpers/commonRecipeTest");
const yummly = require("../scrapers/yummly");
const Constants = require("./constants/yummlyConstants");

commonRecipeTest("yummly", yummly, Constants, "yummly.com/recipe");
