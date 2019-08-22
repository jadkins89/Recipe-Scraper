"use strict";
const commonRecipeTest = require("./helpers/commonRecipeTest");
const ambitiousKitchen = require("../scrapers/ambitiouskitchen");
const Constants = require("./constants/ambitiouskitchenConstants");

commonRecipeTest(
  "ambitiousKitchen",
  ambitiousKitchen,
  Constants,
  "ambitiouskitchen.com"
);
