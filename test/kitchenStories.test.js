"use strict";
const commonRecipeTest = require("./helpers/commonRecipeTest");
const kitchenStories = require("../scrapers/kitchenstories");
const Constants = require("./constants/kitchenstoriesConstants");

commonRecipeTest(
  "kitchenStories",
  kitchenStories,
  Constants,
  "kitchenstories.com/en/recipes' or 'kitchenstories.com/de/rezepte"
);
