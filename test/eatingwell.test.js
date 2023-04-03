"use strict";
const { assert, expect } = require("chai");
const {percentageOfLikeliness} = require("./helpers/precentageOfLikeliness");
const EatingWellScraper = require("../scrapers/EatingWellScraper");
const constants = require("./constants/eatingwellConstants");

describe("eatingWell", () => {
  let eatingWell;

  before(() => {
    eatingWell = new EatingWellScraper();
  });

  it("should fetch the expected recipe", async () => {
    eatingWell.url = constants.testUrl;
    let actualRecipe = await eatingWell.fetchRecipe();
    const likeliness = percentageOfLikeliness(
      JSON.stringify(constants.expectedRecipe),
      JSON.stringify(actualRecipe)
    );
    console.log("likeliness: ", likeliness);
    expect(Number(likeliness)).to.be.gt(80);
  });

  it("should fetch another expected recipe", async () => {
    eatingWell.url = constants.testUrl2;
    let actualRecipe = await eatingWell.fetchRecipe();
    const likeliness = percentageOfLikeliness(
      JSON.stringify(constants.expectedRecipe2),
      JSON.stringify(actualRecipe)
    );
    console.log("likeliness: ", likeliness);
    expect(Number(likeliness)).to.be.gt(80);
  });

  it("should throw an error if a problem occurred during page retrieval", async () => {
    try {
      eatingWell.url = constants.invalidUrl;
      await eatingWell.fetchRecipe();
      assert.fail("was not supposed to succeed");
    } catch (error) {
      expect(error.message).to.equal("No recipe found on page");
    }
  });

  it("should throw an error if the url doesn't contain required sub-url", async () => {
    try {
      eatingWell.url = constants.invalidDomainUrl;
      await eatingWell.fetchRecipe();
      assert.fail("was not supposed to succeed");
    } catch (error) {
      expect(error.message).to.equal(
        `url provided must include 'eatingwell.com/recipe'`
      );
    }
  });

});
