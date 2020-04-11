"use strict";
const commonRecipeTest = require("./helpers/commonRecipeTest");
const averieCooks = require("../scrapers/averiecooks");
const Constants = require("./constants/averiecooksConstants");

commonRecipeTest("averieCooks", averieCooks, Constants, "averiecooks.com");
