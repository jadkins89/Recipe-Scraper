"use strict";
import { assert, expect } from 'chai';
import Scraper from '../scrapers/JamieOliverScraper.js';
import constants from './constants/jamieoliverConstants.js';
import {percentageOfLikeliness} from "./helpers/precentageOfLikeliness.js";

describe("JamieOliver", () => {
  let jamieOliver;

  before(() => {
    jamieOliver = new Scraper();
  });

  it("should fetch the expected recipe", async () => {
    jamieOliver.url = constants.testUrl;
    const actualRecipe = await jamieOliver.fetchRecipe();
    const likeliness = percentageOfLikeliness(
      JSON.stringify(constants.expectedRecipe),
      JSON.stringify(actualRecipe)
    );
    console.log("likeliness: ", likeliness);
    expect(Number(likeliness)).to.be.gt(80);
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
});
