const parseDomain = require("parse-domain");

const domains = {
  "101cookbooks": require("./101cookbooks"),
  allrecipes: require("./allrecipes"),
  ambitiouskitchen: require("./ambitiouskitchen"),
  bbc: require("./bbc"),
  bbcgoodfood: require("./bbcgoodfood"),
  bonappetit: require("./bonappetit"),
  budgetbytes: require("./budgetbytes"),
  closetcooking: require("./closetcooking"),
  cookieandkate: require("./cookieAndKate"),
  copykat: require("./copykat"),
  eatingwell: require("./eatingwell"),
  epicurious: require("./epicurious"),
  finecooking: require("./finecooking"),
  food: require("./food"),
  foodandwine: require("./foodandwine"),
  foodnetwork: require("./foodnetwork"),
  gimmesomeoven: require("./gimmesomeoven"),
  myrecipes: require("./myrecipes"),
  seriouseats: require("./seriouseats"),
  simplyrecipes: require("./simplyrecipes"),
  smittenkitchen: require("./smittenkitchen"),
  thepioneerwoman: require("./thepioneerwoman"),
  therealfoodrds: require("./therealfoodrds"),
  thespruceeats: require("./thespruceeats"),
  whatsgabycooking: require("./whatsgabycooking"),
  yummly: require("./yummly")
};

const recipeScraper = url => {
  let domain = parseDomain(url).domain;
  return new Promise((resolve, reject) => {
    if (domains[domain] !== undefined) {
      resolve(domains[domain](url));
    } else {
      reject(new Error("Site not yet supported"));
    }
  });
};

module.exports = recipeScraper;
