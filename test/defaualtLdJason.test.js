const {assert, expect} = require("chai");
const ScraperFactory = require("../helpers/ScraperFactory");
const constants = require("./constants/defaultLdJasonConstants");

describe("defaultLdJson", () => {
  let scraper;

  var testWithData = function (url) {
    return async function () {
      console.log(url);
      //Here do your test.
      scraper.url = url;
      let isServiceAvailable = await scraper.checkServerResponse();

      if (!isServiceAvailable) {
        console.log('SKIP TEST, server not responding', isServiceAvailable);
        expect(true);
      } else {
        let actualRecipe = await scraper.fetchRecipe();
        expect(actualRecipe).to.not.be.null;
      }
    };
  };

  before(() => {
    scraper = new ScraperFactory().getScraper("www.test.com");
  });

  constants.testUrls.forEach(function (url) {
    it("should fetch the expected recipe", testWithData(url));
  });

  it("should throw an error if the url does not contain a Recipe Ld+Json schema", async () => {
    try {
      scraper.url = constants.noLdJasonSupportedRecipeUrl;
      await scraper.fetchRecipe();
      assert.fail("was not supposed to succeed");
    } catch (error) {
      expect(error.message).to.equal("Site not yet supported");
    }
  });

});

