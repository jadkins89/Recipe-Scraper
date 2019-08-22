"use strict";
const commonRecipeTest = require("./helpers/commonRecipeTest");
const copyKat = require("../scrapers/copykat");
const Constants = require("./constants/copykatConstants");

commonRecipeTest("copyKat", copyKat, Constants, "copykat.com/");
