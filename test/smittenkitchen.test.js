"use strict";
const { assert, expect } = require("chai");

const SmittenKitchen = require("../scrapers/SmittenKitchenScraper");
const constants = require("./constants/smittenkitchenConstants");

describe("smittenKitchen", () => {
  let smittenKitchen;
  before(() => {
    smittenKitchen = new SmittenKitchen();
  });

  it("should fetch the expected recipe (old style)", async () => {
    smittenKitchen.url = constants.testUrlOld;
    let actualRecipe = await smittenKitchen.fetchRecipe();
    expect(constants.expectedRecipeOld).to.deep.equal(actualRecipe);
  });

  it("should fetch the expected recipe (new style V1)", async () => {
    smittenKitchen.url = constants.testUrlNewV1;
    let actualRecipe = await smittenKitchen.fetchRecipe();
    expect(constants.expectedRecipeNewV1).to.deep.equal(actualRecipe);
  });

  it("should fetch the expected recipe (new style V2)", async () => {
    smittenKitchen.url = constants.testUrlNewV2;
    let actualRecipe = await smittenKitchen.fetchRecipe();
    expect(constants.expectedRecipeNewV2).to.deep.equal(actualRecipe);
  });

  it("should throw an error if invalid url is used", async () => {
    try {
      smittenKitchen.url = constants.invalidDomainUrl;
      await smittenKitchen.fetchRecipe();
      assert.fail("was not supposed to succeed");
    } catch (error) {
      expect(error.message).to.equal(
        "url provided must include 'smittenkitchen.com/'"
      );
    }
  });

  it("should throw an error if a problem occurred during page retrieval", async () => {
    try {
      smittenKitchen.url = constants.invalidUrl;
      await smittenKitchen.fetchRecipe();
      assert.fail("was not supposed to succeed");
    } catch (error) {
      expect(error.message).to.equal("No recipe found on page");
    }
  });

  it("should throw an error if non-recipe page is used", async () => {
    try {
      smittenKitchen.url = constants.nonRecipeUrl;
      await smittenKitchen.fetchRecipe();
      assert.fail("was not supposed to succeed");
    } catch (error) {
      expect(error.message).to.equal("No recipe found on page");
    }
  });
});
