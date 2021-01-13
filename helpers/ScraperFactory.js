"use strict";

const parseDomain = require("parse-domain");

const domains = {
  "101cookbooks": require("../scrapers/101CookbooksScraper"),
  allrecipes: require("../scrapers/AllRecipesScraper"),
  ambitiouskitchen: require("../scrapers/AmbitiousKitchenScraper"),
  averiecooks: require("../scrapers/AverieCooksScraper"),
  bbc: require("../scrapers/BbcScraper"),
  bbcgoodfood: require("../scrapers/BbcGoodFoodScraper"),
  bonappetit: require("../scrapers/BonAppetitScraper"),
  budgetbytes: require("../scrapers/BudgetBytesScraper"),
  centraltexasfoodbank: require("../scrapers/CentralTexasFoodBankScraper"),
  closetcooking: require("../scrapers/closetcooking"),
  cookieandkate: require("../scrapers/cookieandkate"),
  copykat: require("../scrapers/copykat"),
  damndelicious: require("../scrapers/damndelicious"),
  eatingwell: require("../scrapers/eatingwell"),
  epicurious: require("../scrapers/epicurious"),
  food: require("../scrapers/food"),
  foodandwine: require("../scrapers/foodandwine"),
  foodnetwork: require("../scrapers/foodnetwork"),
  gimmedelicious: require("../scrapers/gimmedelicious"),
  gimmesomeoven: require("../scrapers/gimmesomeoven"),
  julieblanner: require("../scrapers/julieblanner"),
  kitchenstories: require("../scrapers/kitchenstories"),
  melskitchencafe: require("../scrapers/melskitchencafe"),
  minimalistbaker: require("../scrapers/minimalistbaker"),
  myrecipes: require("../scrapers/myrecipes"),
  nomnompaleo: require("../scrapers/nomnompaleo"),
  omnivorescookbook: require("../scrapers/omnivorescookbook"),
  pinchofyum: require("../scrapers/pinchofyum"),
  recipetineats: require("../scrapers/recipetineats"),
  seriouseats: require("../scrapers/seriouseats"),
  simplyrecipes: require("../scrapers/simplyrecipes"),
  smittenkitchen: require("../scrapers/smittenkitchen"),
  tastesbetterfromscratch: require("../scrapers/tastesbetterfromscratch"),
  tasteofhome: require("../scrapers/tasteofhome"),
  theblackpeppercorn: require("../scrapers/theblackpeppercorn"),
  therecipecritic: require("../scrapers/therecipecritic"),
  thepioneerwoman: require("../scrapers/thepioneerwoman"),
  therealfoodrds: require("../scrapers/therealfoodrds"),
  thespruceeats: require("../scrapers/thespruceeats"),
  whatsgabycooking: require("../scrapers/whatsgabycooking"),
  woolworths: require("../scrapers/woolworths"),
  yummly: require("../scrapers/yummly")
};

const instances = {};

/**
 * A Singleton Factory to whom supplies an instance of a scraper based on a give URL
 */
class ScraperFactory {
  getScraper(url) {
    let parse = parseDomain(url);
    if (parse) {
      let domain = parse.domain;
      if (!instances[domain]) {
        if (domains[domain] !== undefined) {
          instances[domain] = new domains[domain](url);
        } else {
          throw new Error("Site not yet supported");
        }
      }
      return instances[domain];
    } else {
      throw new Error("Failed to parse domain");
    }
  }
}

const singletonFactory = new ScraperFactory();
Object.freeze(singletonFactory);

module.exports = singletonFactory;
