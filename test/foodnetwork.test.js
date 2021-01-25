"use strict";
const { assert, expect } = require("chai");

const FoodNetworkScraper = require("../scrapers/FoodNetworkScraper");
const constants = require("./constants/foodnetworkConstants");

describe("foodNetwork", () => {
  let foodNetwork;

  before(() => {
    foodNetwork = new FoodNetworkScraper();
  });

  it("should fetch the expected recipe(1)", async () => {
    foodNetwork.url = constants.testUrl;
    let actualRecipe = await foodNetwork.fetchRecipe();
    expect(JSON.stringify(constants.expectedRecipe)).to.equal(
      JSON.stringify(actualRecipe)
    );
  });

  it("should fetch the expected recipe(2)", async () => {
    foodNetwork.url = constants.anotherTestUrl;
    let actualRecipe = await foodNetwork.fetchRecipe();
    expect(JSON.stringify(constants.anotherExpectedRecipe)).to.equal(
      JSON.stringify(actualRecipe)
    );
  });

  it("should throw an error if invalid url is used", async () => {
    try {
      foodNetwork.url = constants.invalidDomainUrl;
      await foodNetwork.fetchRecipe();
      assert.fail("was not supposed to succeed");
    } catch (error) {
      expect(error.message).to.equal(
        "url provided must include 'foodnetwork.com/recipes/'"
      );
    }
  });

  it("should throw an error if a problem occurred during page retrieval", async () => {
    try {
      foodNetwork.url = constants.invalidUrl;
      await foodNetwork.fetchRecipe();
      assert.fail("was not supposed to succeed");
    } catch (error) {
      expect(error.message).to.equal("No recipe found on page");
    }
  });

  it("should throw an error if non-recipe page is used", async () => {
    try {
      foodNetwork.url = constants.nonRecipeUrl;
      await foodNetwork.fetchRecipe();
      assert.fail("was not supposed to succeed");
    } catch (error) {
      expect(error.message).to.equal("No recipe found on page");
    }
  });
});
