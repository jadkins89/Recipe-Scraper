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
  yummly: require("./yummly"),
  "101cookbooks": require("./101cookbooks"),
  cookieandkate: require("./cookieAndKate"),
  foodandwine: require("./foodandwine")
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

recipeScraper(
  "https://www.foodandwine.com/recipes/french-onion-soup-ludo-lefebvre"
).then(recipe => {
  console.log(recipe);
});

module.exports = recipeScraper;
