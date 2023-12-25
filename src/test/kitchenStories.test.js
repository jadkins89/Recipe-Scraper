"use strict";
import {commonRecipeTest} from './helpers/commonRecipeTest.js';
import constants from './constants/kitchenstoriesConstants.js';

commonRecipeTest(
  "kitchenStories",
  constants,
  "kitchenstories.com/en/recipes' or 'kitchenstories.com/de/rezepte"
);
