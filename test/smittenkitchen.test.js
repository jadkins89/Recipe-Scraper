"use strict";
const expect = require("chai").expect;
const assert = require("chai").assert;

const smittenKitchen = require("../scrapers/smittenkitchen");
const Constants = require("./constants/smittenkitchenConstants");

describe("smittenKitchen", () => {
  it("should fetch the expected recipe (old style)", async () => {
    let actualRecipe = await smittenKitchen(Constants.testUrlOld);
    expect(JSON.stringify(Constants.expectedRecipeOld)).to.equal(
      JSON.stringify(actualRecipe)
    );
  });

  it("should fetch the expected recipe (new style)", async () => {
    let actualRecipe = await smittenKitchen(Constants.testUrlNew);
    expect(JSON.stringify(Constants.expectedRecipeNew)).to.equal(
      JSON.stringify(actualRecipe)
    );
  });

  it("should throw an error if invalid url is used", async () => {
    try {
      await smittenKitchen(Constants.invalidUrl);
      assert.fail("was not supposed to succeed");
    } catch (error) {
      expect(error.message).to.equal(
        "url provided must include 'smittenkitchen.com/'"
      );
    }
  });

  it("should throw an error if non-recipe page is used", async () => {
    try {
      await smittenKitchen(Constants.nonRecipeUrl);
      assert.fail("was not supposed to succeed");
    } catch (error) {
      expect(error.message).to.equal("No recipe found on page");
    }
  });
});
