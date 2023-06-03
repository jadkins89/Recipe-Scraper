import { expect } from 'chai';
import ScraperFactory from '../helpers/ScraperFactory.js';
import { percentageOfLikeliness } from './helpers/precentageOfLikeliness.js';
import constants from './constants/defaultLdJsonConstants.js';

describe("defaultLdJson", () => {
  let scraper;

  const testWithData = (test) => {
    return async () => {
      let domain = (new URL(test.url));
      console.log(domain.hostname.replace('www.', ''));

      scraper.url = test.url;

      let actualRecipe = await scraper.fetchRecipe();
      const likeliness = percentageOfLikeliness(
        JSON.stringify(test.expected),
        JSON.stringify(actualRecipe)
      );
      console.log("likeliness: ", likeliness);
      expect(Number(likeliness)).to.be.gt(80);

    };
  };

  before(() => {
    scraper = new ScraperFactory().getScraper("www.test.com");
  });

  constants.tests.forEach((test) => {
    it("should fetch the expected recipe: " + test.url, testWithData(test));
  });

  it("should return page title, image & description if the url does not contain a Recipe Ld+Json schema", async () => {
    scraper.url = constants.noLdJsonSupportedRecipeUrl;
    let response = await scraper.fetchRecipe();
    expect(constants.expectedPageInfo).to.deep.equal(response);
  });

});

