"use strict";
const { assert, expect } = require("chai");

const Scraper = require("../scrapers/JamieOliverScraper");
const constants = require("./constants/jamieoliverConstants");

describe("JamieOliver", () => {
  let jamieOliver;

  before(() => {
    jamieOliver = new Scraper();
  });

  it("should fetch the expected recipe", async () => {
    jamieOliver.url = constants.testUrl;
    const actualRecipe = await jamieOliver.fetchRecipe();
    expect(JSON.stringify(constants.expectedRecipe)).to.equal(
      JSON.stringify(actualRecipe)
    );
  });

  it("should throw an error if invalid url is used", async () => {
    try {
      jamieOliver.url = constants.invalidDomainUrl;
      await jamieOliver.fetchRecipe();
      assert.fail("was not supposed to succeed");
    } catch (error) {
      expect(error.message).to.equal(
        "url provided must include 'jamieoliver.com/'"
      );
    }
  });

  it("should throw an error if a problem occurred during page retrieval", async () => {
    try {
      jamieOliver.url = constants.invalidUrl;
      await jamieOliver.fetchRecipe();
      assert.fail("was not supposed to succeed");
    } catch (error) {
      expect(error.message).to.equal("No recipe found on page");
    }
  });

  it("should throw an error if non-recipe page is used", async () => {
    try {
      jamieOliver.url = constants.nonRecipeUrl;
      await jamieOliver.fetchRecipe();
      assert.fail("was not supposed to succeed");
    } catch (error) {
      expect(error.message).to.equal("No recipe found on page");
    }
  });
});
