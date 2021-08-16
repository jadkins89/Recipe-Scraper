const PuppeteerScraper = require("./PuppeteerScraper");

class DefaultLdJsonScraper extends PuppeteerScraper {

  async customPoll(page) {
    let container,
      count = 0;
    do {
      container = await page.$("script[type='application/ld+json']");
      if (!container) {
        await page.waitForTimeout(100);
        count++;
      }
    } while (!container && count < 60);
    return true;
  }

  scrape($) {
    const isSchemaFound = this.defaultLD_JOSN($);

    if (!isSchemaFound) {
      throw new Error("Site not yet supported");
    }

    // console.log(this.recipe)

  }
}

module.exports = DefaultLdJsonScraper;
