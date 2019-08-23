"use strict";
const commonRecipeTest = require("./helpers/commonRecipeTest");
const bonAppetit = require("../scrapers/bonappetit");
const Constants = require("./constants/bonappetitConstants");

commonRecipeTest("bonAppetit", bonAppetit, Constants, "bonappetit.com/recipe/");
