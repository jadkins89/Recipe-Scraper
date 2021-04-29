const {assert, expect} = require("chai");
const ScraperFactory = require("../../helpers/ScraperFactory");

const commonRecipeTest = (name, constants, url) => {
  describe(name, () => {
    let scraper;

    before(() => {
      scraper = new ScraperFactory().getScraper(url);
    });

    it("should fetch the expected recipe", async () => {
      scraper.url = constants.testUrl;
      let isServiceAvailable = await scraper.checkServerResponse();

      if (!isServiceAvailable) {
        console.log('SKIP TEST, server not responding', isServiceAvailable)
        expect(true);
      } else {
        let actualRecipe = await scraper.fetchRecipe();
        expect(constants.expectedRecipe).to.deep.equal(actualRecipe);
      }

    });

    it("should throw an error if a problem occurred during page retrieval", async () => {
      try {
        scraper.url = constants.invalidUrl;
        await scraper.fetchRecipe();
        assert.fail("was not supposed to succeed");
      } catch (error) {
        expect(error.message).to.equal("No recipe found on page");
      }
    });

    it("should throw an error if the url doesn't contain required sub-url", async () => {
      try {
        scraper.url = constants.invalidDomainUrl;
        await scraper.fetchRecipe();
        assert.fail("was not supposed to succeed");
      } catch (error) {
        expect(error.message).to.equal(`url provided must include '${url}'`);
      }
    });

    it("should throw an error if non-recipe page is used", async () => {
      try {
        scraper.url = constants.nonRecipeUrl;
        await scraper.fetchRecipe(constants.nonRecipeUrl);
        assert.fail("was not supposed to succeed");
      } catch (error) {
        expect(error.message).to.equal("No recipe found on page");
      }
    });
  });
};

module.exports = commonRecipeTest;
