const BaseScraper = require("./BaseScraper");

class DefaultLdJasonScraper extends BaseScraper {
  scrape($) {
    const isSchemaFound = this.defaultLD_JOSN($);

    console.log(isSchemaFound)
    console.log(this.recipe)

    if (!isSchemaFound) {
      throw new Error("Site not yet supported");
    }

  }
}

module.exports = DefaultLdJasonScraper;
