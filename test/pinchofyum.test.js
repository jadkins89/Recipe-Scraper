"use strict";
const commonRecipeTest = require("./helpers/commonRecipeTest");
const pinchOfYum = require("../scrapers/pinchofyum");
const Constants = require("./constants/pinchofyumConstants");

commonRecipeTest("pinchOfYum", pinchOfYum, Constants, "pinchofyum.com/");
