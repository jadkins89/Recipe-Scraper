"use strict";
const { assert, expect } = require("chai");

const Scraper = require("../scrapers/AllRecipesScraper");
const constants = require("./constants/allRecipesConstants");

describe("allRecipes", () => {
  let allRecipes;

  before(() => {
    allRecipes = new Scraper();
  });

  it("should fetch the expected recipe (old style)", async () => {
    allRecipes.url = constants.testUrlOld;
    const actualRecipe = await allRecipes.fetchRecipe();
    expect(JSON.stringify(constants.expectedRecipeOld)).to.equal(
      JSON.stringify(actualRecipe)
    );
  });

  it("should fetch the expected recipe (new style)", async () => {
    allRecipes.url = constants.testUrlNew;
    const actualRecipe = await allRecipes.fetchRecipe();
    expect(JSON.stringify(constants.expectedRecipeNew)).to.equal(
      JSON.stringify(actualRecipe)
    );
  });

  it("should throw an error if invalid url is used", async () => {
    try {
      allRecipes.url = constants.invalidDomainUrl;
      await allRecipes.fetchRecipe();
      assert.fail("was not supposed to succeed");
    } catch (error) {
      expect(error.message).to.equal(
        "url provided must include 'allrecipes.com/recipe'"
      );
    }
  });

  it("should throw an error if a problem occurred during page retrieval", async () => {
    try {
      allRecipes.url = constants.invalidUrl;
      await allRecipes.fetchRecipe();
      assert.fail("was not supposed to succeed");
    } catch (error) {
      expect(error.message).to.equal("No recipe found on page");
    }
  });
});
