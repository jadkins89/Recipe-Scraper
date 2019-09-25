"use strict";
const expect = require("chai").expect;
const assert = require("chai").assert;

const whatsGabyCooking = require("../scrapers/whatsgabycooking");
const Constants = require("./constants/whatsgabycookingConstants");

describe("whatsGabyCooking", () => {
  it("should fetch the expected recipe", async () => {
    let actualRecipe = await whatsGabyCooking(Constants.testUrl);
    expect(JSON.stringify(Constants.expectedRecipe)).to.equal(
      JSON.stringify(actualRecipe)
    );
  });

  it("should throw an error if a problem occurred during page retrieval", async () => {
    try {
      await whatsGabyCooking(Constants.invalidUrl);
      assert.fail("was not supposed to succeed");
    } catch (error) {
      expect(error.message).to.equal(
        "No recipe found on page"
      );
    }
  });

  it("should throw an error if the whatsgabycooking.com doesn't contain required sub-whatsgabycooking.com", async () => {
    try {
      await whatsGabyCooking(Constants.invalidDomainUrl);
      assert.fail("was not supposed to succeed");
    } catch (error) {
      expect(error.message).to.equal(`url provided must include 'whatsgabycooking.com/'`);
    }
  });

  it("should throw an error if non-recipe page is used", async () => {
    try {
      await whatsGabyCooking(Constants.nonRecipeUrl);
      assert.fail("was not supposed to succeed");
    } catch (error) {
      expect(error.message).to.equal("No recipe found on page");
    }
  });
});