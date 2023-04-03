"use strict";
const { assert, expect } = require("chai");
const {percentageOfLikeliness} = require("./helpers/precentageOfLikeliness");
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
    const likeliness = percentageOfLikeliness(
      JSON.stringify(constants.expectedRecipe),
      JSON.stringify(actualRecipe)
    );
    console.log("likeliness: ", likeliness);
    expect(Number(likeliness)).to.be.gt(80);
  });

  it("should fetch the expected recipe(2)", async () => {
    foodNetwork.url = constants.anotherTestUrl;
    let actualRecipe = await foodNetwork.fetchRecipe();
    const likeliness = percentageOfLikeliness(
      JSON.stringify(constants.anotherExpectedRecipe),
      JSON.stringify(actualRecipe)
    );
    console.log("likeliness: ", likeliness);
    expect(Number(likeliness)).to.be.gt(80);
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

});
