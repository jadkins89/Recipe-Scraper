const parseDomain = require("parse-domain");

const domains = {
  "101cookbooks": require("./101cookbooks"),
  allrecipes: require("./allrecipes"),
  ambitiouskitchen: require("./ambitiouskitchen"),
  bbc: require("./bbc"),
  cookieandkate: require("./cookieAndKate"),
  copykat: require("./copykat"),
  epicurious: require("./epicurious"),
  food: require("./food"),
  foodandwine: require("./foodandwine"),
  foodnetwork: require("./foodnetwork"),
  seriouseats: require("./seriouseats"),
  simplyrecipes: require("./simplyrecipes"),
  smittenkitchen: require("./smittenkitchen"),
  thepioneerwoman: require("./thepioneerwoman"),
  therealfoodrds: require("./therealfoodrds"),
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

recipeScraper(
  "https://www.bbc.co.uk/food/recipes/sausage_and_gnocchi_bake_80924"
).then(recipe => {
  console.log(recipe);
});

module.exports = recipeScraper;
