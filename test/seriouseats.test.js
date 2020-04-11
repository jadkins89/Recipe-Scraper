"use strict";
const expect = require("chai").expect;
const assert = require("chai").assert;

const seriousEats = require("../scrapers/seriouseats");
const Constants = require("./constants/seriouseatsConstants");

describe("seriousEats", () => {
  it("should fetch the expected recipe", async () => {
    let actualRecipe = await seriousEats(Constants.testUrl);
    expect(JSON.stringify(Constants.expectedRecipe)).to.equal(
      JSON.stringify(actualRecipe)
    );
  });

  it("should throw an error if invalid url is used", async () => {
    try {
      await seriousEats(Constants.invalidDomainUrl);
      assert.fail("was not supposed to succeed");
    } catch (error) {
      expect(error.message).to.equal(
        "url provided must include 'seriouseats.com/'"
      );
    }
  });

  it("should throw an error if a problem occurred during page retrieval", async () => {
    try {
      await seriousEats(Constants.invalidUrl);
      assert.fail("was not supposed to succeed");
    } catch (error) {
      expect(error.message).to.equal("No recipe found on page");
    }
  });

  it("should throw an error if non-recipe page is used", async () => {
    try {
      await seriousEats(Constants.nonRecipeUrl);
      assert.fail("was not supposed to succeed");
    } catch (error) {
      expect(error.message).to.equal("No recipe found on page");
    }
  });

  it("should throw an error if sponsored recipe is used", async () => {
    try {
      await seriousEats(Constants.sponsorUrl);
      assert.fail("was not supposed to succeed");
    } catch (error) {
      expect(error.message).to.equal(
        "seriouseats.com sponsored recipes not supported"
      );
    }
  });
});
