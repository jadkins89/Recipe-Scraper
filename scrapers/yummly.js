const cheerio = require("cheerio");
const puppeteer = require("puppeteer");

const RecipeSchema = require("../helpers/recipe-schema");

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

const customPuppeteerFetch = async url => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setRequestInterception(true);

  page.on("request", req => {
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
  try {
    const response = await page.goto(url);
    if (response._status < 400) {
      try {
        let steps = (await page.$$(".step")).length;
        let newSteps = -1;

        while (steps >= newSteps) {
          await page.waitFor(100);
          await page.$eval(
            "a.view-more-steps",
            /* istanbul ignore next */ elem => elem.click()
          );
          newSteps = (await page.$$(".step")).length;
        }
      } finally {
        let html = await page.content();
        await browser.close();
        return html;
      }
    } else {
      await brower.close();
      return Promise.reject(response._status);
    }
  } catch (e) {
    await browser.close();
    return Promise.reject("invalid url");
  }
};

const yummy = url => {
  return new Promise(async (resolve, reject) => {
    if (!url.includes("yummly.com/recipe")) {
      reject(new Error("url provided must include 'yummly.com/recipe'"));
    } else {
      try {
        const html = await customPuppeteerFetch(url);
        const Recipe = new RecipeSchema();
        const $ = cheerio.load(html);

        Recipe.image = $("meta[property='og:image']").attr("content");
        Recipe.name = $(".recipe-title").text();

        $(".IngredientLine").each((i, el) => {
          Recipe.ingredients.push($(el).text());
        });

        $(".step").each((i, el) => {
          Recipe.instructions.push($(el).text());
        });

        Recipe.time.total =
          $("div.unit")
            .children()
            .first()
            .text() +
          " " +
          $("div.unit")
            .children()
            .last()
            .text();

        Recipe.servings = $("input.font-bold").val();

        if (!Recipe.name || !Recipe.ingredients.length) {
          reject(new Error("No recipe found on page"));
        } else {
          resolve(Recipe);
        }
      } catch (error) {
        reject(new Error("No recipe found on page"));
      }
    }
  });
};

module.exports = yummy;
