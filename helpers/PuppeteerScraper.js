"use strict";

const puppeteer = require("puppeteer");
const cheerio = require("cheerio");

const blockedResourceTypes = [
  "image",
  "media",
  "font",
  "texttrack",
  "object",
  "beacon",
  "csp_report",
  "imageset",
  "stylesheet",
  "font"
];

const skippedResources = [
  "quantserve",
  "adzerk",
  "doubleclick",
  "adition",
  "exelator",
  "sharethrough",
  "cdn.api.twitter",
  "google-analytics",
  "googletagmanager",
  "google",
  "fontawesome",
  "facebook",
  "analytics",
  "optimizely",
  "clicktale",
  "mixpanel",
  "zedo",
  "clicksor",
  "tiqcdn"
];

const BaseScraper = require("./BaseScraper");

/**
 * Inheritable class which uses puppeteer instead of a simple http request
 */
class PuppeteerScraper extends BaseScraper {
  /**
   *
   */
  async customPoll(page) {
    return true;
  }

  /**
   * @override
   * Fetches html from url using puppeteer headless browser
   * @returns {object} - Cheerio instance
   */
  async fetchDOMModel() {
    const browser = await puppeteer.launch({
      headless: true
    });
    const page = await browser.newPage();
    await page.setRequestInterception(true);

    await page.on("request", req => {
      const requestUrl = req._url.split("?")[0].split("#")[0];
      if (
        blockedResourceTypes.indexOf(req.resourceType()) !== -1 ||
        skippedResources.some(resource => requestUrl.indexOf(resource) !== -1)
      ) {
        req.abort();
      } else {
        req.continue();
      }
    });

    const response = await page.goto(this.url);

    let html;
    if (response._status < 400) {
      await this.customPoll(page);
      html = await page.content();
    }
    browser.close().catch(err => {
    });

    if (response._status >= 400) {
      this.defaultError()
    }
    return cheerio.load(html);
  }

  static async isElementVisible(page, cssSelector) {
    let visible = true;
    await page
      .waitForSelector(cssSelector, {visible: true, timeout: 2000})
      .catch(() => {
        visible = false;
      });
    return visible;
  };
}

module.exports = PuppeteerScraper;
