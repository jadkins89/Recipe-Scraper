"use strict";
const expect = require("chai").expect;
const assert = require("chai").assert;

const foodNetwork = require("../scrapers/foodnetwork");
const Constants = require("./constants/foodnetworkConstants");

describe("foodNetwork", () => {
  it("should fetch the expected recipe(1)", async () => {
    let actualRecipe = await foodNetwork(Constants.testUrl);
    expect(JSON.stringify(Constants.expectedRecipe)).to.equal(
      JSON.stringify(actualRecipe)
    );
  });

  it("should fetch the expected recipe(2)", async () => {
    let actualRecipe = await foodNetwork(Constants.anotherTestUrl);
    expect(JSON.stringify(Constants.anotherExpectedRecipe)).to.equal(
      JSON.stringify(actualRecipe)
    );
  });

  it("should throw an error if invalid url is used", async () => {
    try {
      await foodNetwork(Constants.invalidDomainUrl);
      assert.fail("was not supposed to succeed");
    } catch (error) {
      expect(error.message).to.equal(
        "url provided must include 'foodnetwork.com/recipes/'"
      );
    }
  });

  it("should throw an error if a problem occurred during page retrieval", async () => {
    try {
      await foodNetwork(Constants.invalidUrl);
      assert.fail("was not supposed to succeed");
    } catch (error) {
      expect(error.message).to.equal("No recipe found on page");
    }
  });

  it("should throw an error if non-recipe page is used", async () => {
    try {
      await foodNetwork(Constants.nonRecipeUrl);
      assert.fail("was not supposed to succeed");
    } catch (error) {
      expect(error.message).to.equal("No recipe found on page");
    }
  });
});
