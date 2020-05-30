"use strict";
const commonRecipeTest = require("./helpers/commonRecipeTest");
const nomNomPaleo = require("../scrapers/nomnompaleo");
const Constants = require("./constants/nomnompaleoConstants");

commonRecipeTest("nomnompaleo", nomNomPaleo, Constants, "nomnompaleo.com/");
