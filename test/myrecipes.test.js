"use strict";
const commonRecipeTest = require("./helpers/commonRecipeTest");
const myRecipes = require("../scrapers/myrecipes");
const Constants = require("./constants/myrecipesConstants");

commonRecipeTest("myRecipes", myRecipes, Constants, "myrecipes.com/recipe");
