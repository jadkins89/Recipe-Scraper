"use strict";
const commonRecipeTest = require("./helpers/commonRecipeTest");
const food = require("../scrapers/food");
const Constants = require("./constants/foodConstants");

commonRecipeTest("food", food, Constants, "food.com/recipe/");
