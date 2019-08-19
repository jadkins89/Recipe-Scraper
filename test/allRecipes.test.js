"use strict";

var expect = require("chai").expect;
const allRecipes = require("../scrapers/allrecipes");
const Constants = require("./constants/allRecipesConstants");

describe("allRecipes", () => {
  it("should fetch the expected recipe (old style)", async () => {
    let actualRecipe = await allRecipes(Constants.testUrlOld);
    expect(JSON.stringify(Constants.expectedRecipeOld)).to.equal(
      JSON.stringify(actualRecipe)
    );
  });

  it("should fetch the expected recipe (new style)", async () => {
    let actualRecipe = await allRecipes(Constants.testUrlNew);
    expect(JSON.stringify(Constants.expectedRecipeNew)).to.equal(
      JSON.stringify(actualRecipe)
    );
  });

  it("should throw an error if invalid url is used", async () => {
    try {
      await allRecipes(Constants.invalidUrl);
      assert.fail("was not supposed to succeed");
    } catch (error) {
      expect(error).to.equal(
        "url provided must include 'allrecipes.com/recipe'"
      );
    }
  });

  it("should throw an error if non-recipe page is used", async () => {
    try {
      await allRecipes(Constants.nonRecipeUrl);
      assert.fail("was not supposed to succeed");
    } catch (error) {
      expect(error).to.equal("No recipe found on page");
    }
  });
});
