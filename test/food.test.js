"use strict";

const expect = require("chai").expect;
const assert = require("chai").assert;

const food = require("../scrapers/food");
const Constants = require("./constants/foodConstants");

describe("food", () => {
  it("should fetch the expected recipe", async () => {
    let actualRecipe = await food(Constants.testUrl);
    expect(JSON.stringify(Constants.expectedRecipe)).to.equal(
      JSON.stringify(actualRecipe)
    );
  });

  it("should throw an error if invalid url is used", async () => {
    try {
      await food(Constants.invalidUrl);
      assert.fail("was not supposed to succeed");
    } catch (error) {
      expect(error.message).to.equal(
        "url provided must include 'food.com/recipe/'"
      );
    }
  });

  it("should throw an error if non-recipe page is used", async () => {
    try {
      await food(Constants.nonRecipeUrl);
      assert.fail("was not supposed to succeed");
    } catch (error) {
      expect(error.message).to.equal("No recipe found on page");
    }
  });
});
