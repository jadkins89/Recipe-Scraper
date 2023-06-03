/**
 * A Factory that supplies an instance of a scraper based on a given URL
 */
"use strict";
import { parseDomain, fromUrl } from "parse-domain";
import cookbooks101 from '../scrapers/101CookbooksScraper.js';
import allrecipes from '../scrapers/AllRecipesScraper.js';
import ambitiouskitchen from '../scrapers/AmbitiousKitchenScraper.js';
import averiecooks from '../scrapers/AverieCooksScraper.js';
import bbc from '../scrapers/BbcScraper.js';
import bbcgoodfood from '../scrapers/BbcGoodFoodScraper.js';
import bonappetit from '../scrapers/BonAppetitScraper.js';
import budgetbytes from '../scrapers/BudgetBytesScraper.js';
import centraltexasfoodbank from '../scrapers/CentralTexasFoodBankScraper.js';
import closetcooking from '../scrapers/ClosetCookingScraper.js';
import cookieandkate from '../scrapers/CookieAndKateScraper.js';
import copykat from '../scrapers/CopyKatScraper.js';
import damndelicious from '../scrapers/DamnDeliciousScraper.js';
import eatingwell from '../scrapers/EatingWellScraper.js';
import food from '../scrapers/FoodScraper.js';
import foodandwine from '../scrapers/FoodAndWineScraper.js';
import foodnetwork from '../scrapers/FoodNetworkScraper.js';
import gimmesomeoven from '../scrapers/GimmeSomeOvenScraper.js';
import julieblanner from '../scrapers/JulieBlannerScraper.js';
import kitchenstories from '../scrapers/KitchenStoriesScraper.js';
import melskitchencafe from '../scrapers/MelsKitchenCafeScraper.js';
import minimalistbaker from '../scrapers/MinimalistBakerScraper.js';
import myrecipes from '../scrapers/MyRecipesScraper.js';
import nomnompaleo from '../scrapers/NomNomPaleoScraper.js';
import omnivorescookbook from '../scrapers/OmnivoresCookbookScraper.js';
import pinchofyum from '../scrapers/PinchOfYumScraper.js';
import recipetineats from '../scrapers/RecipeTinEatsScraper.js';
import seriouseats from '../scrapers/SeriousEatsScraper.js';
import smittenkitchen from '../scrapers/SmittenKitchenScraper.js';
import tastesbetterfromscratch from '../scrapers/TastesBetterFromScratchScraper.js';
import tasteofhome from '../scrapers/TasteOfHomeScraper.js';
import thatlowcarblife from '../scrapers/ThatLowCarbLifeScraper.js';
import theblackpeppercorn from '../scrapers/TheBlackPeppercornScraper.js';
import thepioneerwoman from '../scrapers/ThePioneerWomanScraper.js';
import therecipecritic from '../scrapers/TheRecipeCriticScraper.js';
import therealfoodrds from '../scrapers/TheRealFoodDrsScraper.js';
import thespruceeats from '../scrapers/TheSpruceEatsScraper.js';
import whatsgabycooking from '../scrapers/WhatsGabyCookingScraper.js';
import woolworths from '../scrapers/WoolworthsScraper.js';
import yummly from '../scrapers/YummlyScraper.js';
import jamieoliver from '../scrapers/JamieOliverScraper.js';
import DefaultLdJsonScraper from "./DefaultLdJsonScraper.js";

const domains = {
  cookbooks101,
  allrecipes,
  ambitiouskitchen,
  averiecooks,
  bbc,
  bbcgoodfood,
  bonappetit,
  budgetbytes,
  centraltexasfoodbank,
  closetcooking,
  cookieandkate,
  copykat,
  damndelicious,
  eatingwell,
  food,
  foodandwine,
  foodnetwork,
  gimmesomeoven,
  julieblanner,
  kitchenstories,
  melskitchencafe,
  minimalistbaker,
  myrecipes,
  nomnompaleo,
  omnivorescookbook,
  pinchofyum,
  recipetineats,
  seriouseats,
  smittenkitchen,
  tastesbetterfromscratch,
  tasteofhome,
  thatlowcarblife,
  theblackpeppercorn,
  thepioneerwoman,
  therecipecritic,
  therealfoodrds,
  thespruceeats,
  whatsgabycooking,
  woolworths,
  yummly,
  jamieoliver
};

class ScraperFactory {
  getScraper(url) {
    console.log("url: ", url);
    let parse = parseDomain(fromUrl(url));
    if (parse) {
      let domain = parse.domain;
      if (domains[domain] !== undefined) {
        return new domains[domain](url);
      } else {
        return new DefaultLdJsonScraper(url);
      }
    } else {
      throw new Error("Failed to parse domain");
    }
  }
}

export default ScraperFactory;
