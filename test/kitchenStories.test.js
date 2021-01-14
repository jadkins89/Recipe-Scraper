"use strict";
const commonRecipeTest = require("./helpers/commonRecipeTest");
const constants = require("./constants/kitchenstoriesConstants");

commonRecipeTest(
  "kitchenStories",
  constants,
  "kitchenstories.com/en/recipes' or 'kitchenstories.com/de/rezepte"
);
