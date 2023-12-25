"use strict";
import { assert, expect } from 'chai';
import Scraper from '../scrapers/AllRecipesScraper.js';
import constants from './constants/allRecipesConstants.js';
import { percentageOfLikeliness } from './helpers/precentageOfLikeliness.js';

describe("allRecipes", () => {
  let allRecipes;

  before(() => {
    allRecipes = new Scraper();
  });

  it("should fetch the expected recipe (old style)", async () => {
    allRecipes.url = constants.testUrlOld;
    const actualRecipe = await allRecipes.fetchRecipe();
    const likeliness = percentageOfLikeliness(
      JSON.stringify(constants.expectedRecipeOld),
      JSON.stringify(actualRecipe)
    );
    console.log("likeliness: ", likeliness);
    expect(Number(likeliness)).to.be.gt(80);
  });

  it("should fetch the expected recipe (new style)", async () => {
    allRecipes.url = constants.testUrlNew;
    const actualRecipe = await allRecipes.fetchRecipe();
    const likeliness = percentageOfLikeliness(
      JSON.stringify(constants.expectedRecipeNew),
      JSON.stringify(actualRecipe)
    );
    console.log("likeliness: ", likeliness);
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
