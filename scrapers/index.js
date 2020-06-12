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
  finecooking: require("./finecooking"),
  food: require("./food"),
  foodandwine: require("./foodandwine"),
  foodnetwork: require("./foodnetwork"),
  gimmesomeoven: require("./gimmesomeoven"),
  kitchenstories: require("./kitchenstories"),
  myrecipes: require("./myrecipes"),
  nomnompaleo: require("./nomnompaleo"),
  omnivorescookbook: require("./omnivorescookbook"),
  seriouseats: require("./seriouseats"),
  simplyrecipes: require("./simplyrecipes"),
  smittenkitchen: require("./smittenkitchen"),
  thepioneerwoman: require("./thepioneerwoman"),
  therealfoodrds: require("./therealfoodrds"),
  thespruceeats: require("./thespruceeats"),
  whatsgabycooking: require("./whatsgabycooking"),
  woolworths: require("./woolworths"),
  yummly: require("./yummly")
};

const recipeScraper = url => {
  return new Promise((resolve, reject) => {
    let parse = parseDomain(url);
    if (parse) {
      let domain = parse.domain;
      if (domains[domain] !== undefined) {
        resolve(domains[domain](url));
      } else {
        reject(new Error("Site not yet supported"));
      }
    } else {
      reject(new Error("Failed to parse domain"));
    }
  });
};

module.exports = recipeScraper;
