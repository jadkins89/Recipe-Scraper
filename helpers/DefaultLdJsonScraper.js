const BaseScraper = require("./BaseScraper");

class DefaultLdJsonScraper extends BaseScraper {

  // async customPoll(page) {
  //   let container,
  //     count = 0;
  //   do {
  //     container = await page.$("script[type='application/ld+json']");
  //     if (!container) {
  //       await page.waitForTimeout(100);
  //       count++;
  //     }
  //   } while (!container && count < 60);
  //   return true;
  // }

  scrape($) {
    const isSchemaFound = this.defaultLD_JOSN($);

    if (!isSchemaFound) {
      // throw new Error("Site not yet supported");
      // if no recipe schema was found, return the basic page info
      this.defaultSetName($);
      this.defaultSetDescription($);
      this.defaultSetImage($);
    }
  }
}

module.exports = DefaultLdJsonScraper;
