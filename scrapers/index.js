const parseDomain = require("parse-domain");

const domains = {
  allrecipes: require("./allrecipes"),
  foodnetwork: require("./foodnetwork"),
  ambitiouskitchen: require("./ambitiouskitchen"),
  epicurious: require("./epicurious"),
  copykat: require("./copykat"),
  food: require("./food"),
  seriouseats: require("./seriouseats"),
  therealfoodrds: require("./therealfoodrds"),
  simplyrecipes: require("./simplyrecipes"),
  smittenkitchen: require("./smittenkitchen"),
  thepioneerwoman: require("./thepioneerwoman"),
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
