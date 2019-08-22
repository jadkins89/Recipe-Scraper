"use strict";
const expect = require("chai").expect;
const assert = require("chai").assert;

const simplyRecipes = require("../scrapers/simplyrecipes");
const Constants = require("./constants/simplyrecipesConstants");

describe("simplyRecipes", () => {
  it("should fetch the expected recipe", async () => {
    let actualRecipe = await simplyRecipes(Constants.testUrl);
    expect(JSON.stringify(Constants.expectedRecipe)).to.equal(
      JSON.stringify(actualRecipe)
    );
  });

  it("should throw an error if invalid url is used", async () => {
    try {
      await simplyRecipes(Constants.invalidUrl);
      assert.fail("was not supposed to succeed");
    } catch (error) {
      expect(error.message).to.equal(
        "url provided must include 'simplyrecipes.com/recipes/'"
      );
    }
  });

  it("should throw an error if non-recipe page is used", async () => {
    try {
      await simplyRecipes(Constants.nonRecipeUrl);
      assert.fail("was not supposed to succeed");
    } catch (error) {
      console.log(error);
      expect(error.message).to.equal("No recipe found on page");
    }
  });
});
