const parseDomain = require("parse-domain");

const domains = {
  "101cookbooks": require("./101cookbooks"),
  allrecipes: require("./allrecipes"),
  ambitiouskitchen: require("./ambitiouskitchen"),
  averiecooks: require("./averiecooks"),
  bbc: require("./bbc"),
  bbcgoodfood: require("./bbcgoodfood"),
  bonappetit: require("./bonappetit"),
  budgetbytes: require("./budgetbytes"),
  centraltexasfoodbank: require("./centraltexasfoodbank"),
  closetcooking: require("./closetcooking"),
  cookieandkate: require("./cookieandkate"),
  copykat: require("./copykat"),
  damndelicious: require("./damndelicious"),
  eatingwell: require("./eatingwell"),
  epicurious: require("./epicurious"),
  food: require("./food"),
  foodandwine: require("./foodandwine"),
  foodnetwork: require("./foodnetwork"),
  gimmedelicious: require("./gimmedelicious"),
  gimmesomeoven: require("./gimmesomeoven"),
  julieblanner: require("./julieblanner"),
  kitchenstories: require("./kitchenstories"),
  melskitchencafe: require("./melskitchencafe"),
  minimalistbaker: require("./minimalistbaker"),
  myrecipes: require("./myrecipes"),
  nomnompaleo: require("./nomnompaleo"),
  omnivorescookbook: require("./omnivorescookbook"),
  pinchofyum: require("./pinchofyum"),
  recipetineats: require("./recipetineats"),
  seriouseats: require("./seriouseats"),
  simplyrecipes: require("./simplyrecipes"),
  smittenkitchen: require("./smittenkitchen"),
  tastesbetterfromscratch: require("./tastesbetterfromscratch"),
  tasteofhome: require("./tasteofhome"),
  theblackpeppercorn: require("./theblackpeppercorn"),
  therecipecritic: require("./therecipecritic"),
  thepioneerwoman: require("./thepioneerwoman"),
  therealfoodrds: require("./therealfoodrds"),
  thespruceeats: require("./thespruceeats"),
  whatsgabycooking: require("./whatsgabycooking"),
  woolworths: require("./woolworths"),
  yummly: require("./yummly")
};

const recipeScraper = async url => {
  let parse = parseDomain(url);
  if (parse) {
    let domain = parse.domain;
    if (domains[domain] !== undefined) {
      return await domains[domain](url);
    } else {
      throw new Error("Site not yet supported");
    }
  } else {
    throw new Error("Failed to parse domain");
  }
};

module.exports = recipeScraper;
