"use strict";
const { assert, expect } = require("chai");

const SeriousEats = require("../scrapers/SeriousEatsScraper");
const constants = require("./constants/seriouseatsConstants");

describe("seriousEats", () => {
  let seriousEats;

  before(() => {
    seriousEats = new SeriousEats();
  });

  it("should fetch the expected recipe", async () => {
    seriousEats.url = constants.testUrl;
    let actualRecipe = await seriousEats.fetchRecipe();
    expect(JSON.stringify(constants.expectedRecipe)).to.equal(
      JSON.stringify(actualRecipe)
    );
  });

  it("should throw an error if invalid url is used", async () => {
    try {
      seriousEats.url = constants.invalidDomainUrl;
      await seriousEats.fetchRecipe();
      assert.fail("was not supposed to succeed");
    } catch (error) {
      expect(error.message).to.equal(
        "url provided must include 'seriouseats.com/'"
      );
    }
  });

  it("should throw an error if a problem occurred during page retrieval", async () => {
    try {
      seriousEats.url = constants.invalidUrl;
      await seriousEats.fetchRecipe();
      assert.fail("was not supposed to succeed");
    } catch (error) {
      expect(error.message).to.equal("No recipe found on page");
    }
  });

  it("should throw an error if non-recipe page is used", async () => {
    try {
      seriousEats.url = constants.nonRecipeUrl;
      await seriousEats.fetchRecipe();
      assert.fail("was not supposed to succeed");
    } catch (error) {
      expect(error.message).to.equal("No recipe found on page");
    }
  });

  it("should throw an error if sponsored recipe is used", async () => {
    try {
      seriousEats = new SeriousEats(constants.sponsorUrl);
      assert.fail("was not supposed to succeed");
    } catch (error) {
      expect(error.message).to.equal(
        "seriouseats.com sponsored recipes not supported"
      );
    }
  });
});
