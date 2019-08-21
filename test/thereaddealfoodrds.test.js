"use strict";
const expect = require("chai").expect;
const assert = require("chai").assert;

const theRealDealFoodRds = require("../scrapers/therealfoodrds");
const Constants = require("./constants/therealdealfoodrdsConstants");

describe("theRealDealFoodRds", () => {
  it("should fetch the expected recipe", async () => {
    let actualRecipe = await theRealDealFoodRds(Constants.testUrl);
    expect(JSON.stringify(Constants.expectedRecipe)).to.equal(
      JSON.stringify(actualRecipe)
    );
  });

  it("should throw an error if invalid url is used", async () => {
    try {
      await theRealDealFoodRds(Constants.invalidUrl);
      assert.fail("was not supposed to succeed");
    } catch (error) {
      expect(error.message).to.equal(
        "url provided must include 'therealfoodrds.com/'"
      );
    }
  });

  it("should throw an error if non-recipe page is used", async () => {
    try {
      await theRealDealFoodRds(Constants.nonRecipeUrl);
      assert.fail("was not supposed to succeed");
    } catch (error) {
      expect(error.message).to.equal("No recipe found on page");
    }
  });
});
