const allRecipes = require("./allrecipes");
const foodNetwork = require("./foodnetwork");
const ambitiousKitchen = require("./ambitiouskitchen");
const epicurious = require("./epicurious");
const copykat = require("./copykat");
const food = require("./food");
const seriousEats = require("./seriouseats");
const theRealFoodRds = require("./therealfoodrds");
const simplyRecipes = require("./simplyrecipes");
const smittenKitchen = require("./smittenkitchen");
const thePioneerWoman = require("./thepioneerwoman");

thePioneerWoman(
  "https://thepioneerwoman.com/cooking/french-dip-sandwiches/"
).then(recipe => {
  console.log(recipe);
});

module.exports = {
  allRecipes,
  foodNetwork,
  ambitiousKitchen,
  epicurious,
  copykat,
  food,
  seriousEats,
  theRealFoodRds,
  simplyRecipes,
  smittenKitchen
};
