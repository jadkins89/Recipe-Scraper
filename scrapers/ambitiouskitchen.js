const request = require("request");
const cheerio = require("cheerio");
const puppeteer = require("puppeteer");
var RecipeSchema = require("./recipe-schema");

const blockedResourceTypes = [
  "image",
  "media",
  "font",
  "texttrack",
  "object",
  "beacon",
  "csp_report",
  "imageset"
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

const ambitiousKitchen = async url => {
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

  const response = await page.goto(url);

  if (response._status < 400) {
    let html = await page.content();
    await browser.close();

    var Recipe = new RecipeSchema();
    return new Promise((resolve, reject) => {
      const $ = cheerio.load(html);

      Recipe.name = $('[itemprop="name"]').text();

      $('[itemprop="ingredients"]').each((i, el) => {
        const item = $(el)
          .text()
          .replace(/\s\s+/g, "");
        Recipe.ingredients.push(item);
      });

      $('[itemprop="recipeInstructions"]').each((i, el) => {
        const step = $(el)
          .text()
          .replace(/\s\s+/g, "");
        Recipe.instructions.push(step);
      });

      Recipe.time.prep = $("time[itemprop=prepTime]").text() || "";
      Recipe.time.cook = $("time[itemprop=cookTime]").text() || "";
      Recipe.time.ready = $("time[itemprop=totalTime]").text() || "";

      resolve(Recipe);
    });
  } else {
    reject(response._status);
  }
};

module.exports = ambitiousKitchen;
