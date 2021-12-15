const {assert, expect} = require("chai");
const ScraperFactory = require("../helpers/ScraperFactory");
const constants = require("./constants/defaultLdJsonConstants");

describe("defaultLdJson", () => {
  let scraper;

  var testWithData = (test) => {
    return async () => {
      let domain = (new URL(test.url));
      console.log(domain.hostname.replace('www.', ''));

      scraper.url = test.url;
      let isServiceAvailable = await scraper.checkServerResponse();

      if (!isServiceAvailable) {
        console.log('SKIP TEST, server not responding', isServiceAvailable);
        expect(true);
      } else {
        let actualRecipe = await scraper.fetchRecipe();
        expect(test.expected).to.deep.equal(actualRecipe);
      }
    };
  };

  before(() => {
    scraper = new ScraperFactory().getScraper("www.test.com");
  });

  constants.tests.forEach((test) => {
    it("should fetch the expected recipe", testWithData(test));
  });

  it("should return page title, image & description if the url does not contain a Recipe Ld+Json schema", async () => {
      scraper.url = constants.noLdJsonSupportedRecipeUrl;
      let response = await scraper.fetchRecipe();
      expect(constants.expectedPageInfo).to.deep.equal(response);
  });

});

