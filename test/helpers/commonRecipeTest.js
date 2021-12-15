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
        delete actualRecipe.sectionedInstructions;
        expect(constants.expectedRecipe).to.deep.equal(actualRecipe);
      }

    });

    // it("should throw an error if a problem occurred during page retrieval", async () => {
    //   try {
    //     scraper.url = constants.invalidUrl;
    //     await scraper.fetchRecipe();
    //     assert.fail("was not supposed to succeed");
    //   } catch (error) {
    //     expect(error.message).to.equal("No recipe found on page");
    //   }
    // });

    it("should throw an error if the url doesn't contain required sub-url", async () => {
      try {
        scraper.url = constants.invalidDomainUrl;
        await scraper.fetchRecipe();
        assert.fail("was not supposed to succeed");
      } catch (error) {
        expect(error.message).to.equal(`url provided must include '${url}'`);
      }
    });
  });
};

module.exports = commonRecipeTest;
