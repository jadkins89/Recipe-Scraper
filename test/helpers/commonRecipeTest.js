const expect = require("chai").expect;
const assert = require("chai").assert;

function commonRecipeTest(name, scraper, Constants, url) {
  describe(name, () => {
    it("should fetch the expected recipe", async () => {
      let actualRecipe = await scraper(Constants.testUrl);
      expect(Constants.expectedRecipe).to.deep.equal(actualRecipe);
    });

    it("should throw an error if a problem occurred during page retrieval", async () => {
      try {
        await scraper(Constants.invalidUrl);
        assert.fail("was not supposed to succeed");
      } catch (error) {
        expect(error.message).to.equal("No recipe found on page");
      }
    });

    it("should throw an error if the url doesn't contain required sub-url", async () => {
      try {
        await scraper(Constants.invalidDomainUrl);
        assert.fail("was not supposed to succeed");
      } catch (error) {
        expect(error.message).to.equal(`url provided must include '${url}'`);
      }
    });

    it("should throw an error if non-recipe page is used", async () => {
      try {
        await scraper(Constants.nonRecipeUrl);
        assert.fail("was not supposed to succeed");
      } catch (error) {
        expect(error.message).to.equal("No recipe found on page");
      }
    });
  });
}

module.exports = commonRecipeTest;
