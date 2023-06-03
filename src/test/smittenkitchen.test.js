"use strict";
import { assert, expect } from 'chai';
import { percentageOfLikeliness } from './helpers/precentageOfLikeliness.js';
import SmittenKitchen from '../scrapers/SmittenKitchenScraper.js';
import constants from './constants/smittenkitchenConstants.js';

describe("smittenKitchen", () => {
  let smittenKitchen;
  before(() => {
    smittenKitchen = new SmittenKitchen();
  });

  it("should fetch the expected recipe (old style)", async () => {
    smittenKitchen.url = constants.testUrlOld;
    let actualRecipe = await smittenKitchen.fetchRecipe();
    const likeliness = percentageOfLikeliness(
      JSON.stringify(constants.expectedRecipeOld),
      JSON.stringify(actualRecipe)
    );
    console.log("likeliness: ", likeliness);
    expect(Number(likeliness)).to.be.gt(80);
  });

  it("should fetch the expected recipe (new style V1)", async () => {
    smittenKitchen.url = constants.testUrlNewV1;
    let actualRecipe = await smittenKitchen.fetchRecipe();
    const likeliness = percentageOfLikeliness(
      JSON.stringify(constants.expectedRecipeNewV1),
      JSON.stringify(actualRecipe)
    );
    console.log("likeliness: ", likeliness);
    expect(Number(likeliness)).to.be.gt(80);
  });

  it("should fetch the expected recipe (new style V2)", async () => {
    smittenKitchen.url = constants.testUrlNewV2;
    let actualRecipe = await smittenKitchen.fetchRecipe();
    const likeliness = percentageOfLikeliness(
      JSON.stringify(constants.expectedRecipeNewV2),
      JSON.stringify(actualRecipe)
    );
    console.log("likeliness: ", likeliness);
    expect(Number(likeliness)).to.be.gt(80);
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
});
