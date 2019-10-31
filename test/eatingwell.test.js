"use strict";
const expect = require("chai").expect;
const assert = require("chai").assert;

const eatingWell = require("../scrapers/eatingwell");
const Constants = require("./constants/eatingwellConstants");

describe("eatingWell", () => {
  it("should fetch the expected recipe", async () => {
    let actualRecipe = await eatingWell(Constants.testUrl);
    expect(JSON.stringify(Constants.expectedRecipe)).to.equal(
      JSON.stringify(actualRecipe)
    );
  });

  it("should fetch another expected recipe", async () => {
    let actualRecipe = await eatingWell(Constants.testUrl2);
    expect(JSON.stringify(Constants.expectedRecipe2)).to.equal(
      JSON.stringify(actualRecipe)
    );
  });

  it("should throw an error if a problem occurred during page retrieval", async () => {
    try {
      await eatingWell(Constants.invalidUrl);
      assert.fail("was not supposed to succeed");
    } catch (error) {
      expect(error.message).to.equal("No recipe found on page");
    }
  });

  it("should throw an error if the url doesn't contain required sub-url", async () => {
    try {
      await eatingWell(Constants.invalidDomainUrl);
      assert.fail("was not supposed to succeed");
    } catch (error) {
      expect(error.message).to.equal(
        `url provided must include 'eatingwell.com/recipe'`
      );
    }
  });

  it("should throw an error if non-recipe page is used", async () => {
    try {
      await eatingWell(Constants.nonRecipeUrl);
      assert.fail("was not supposed to succeed");
    } catch (error) {
      expect(error.message).to.equal("No recipe found on page");
    }
  });
});
