"use strict";
const commonRecipeTest = require("./helpers/commonRecipeTest");
const budgetBytes = require("../scrapers/budgetbytes");
const Constants = require("./constants/budgetbytesConstants");

commonRecipeTest("budgetBytes", budgetBytes, Constants, "budgetbytes.com/");
