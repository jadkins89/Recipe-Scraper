const allRecipes = require("./allrecipes");
const foodNetwork = require("./foodnetwork");
const ambitiousKitchen = require("./ambitiouskitchen");
const epicurious = require("./epicurious");
const copykat = require("./copykat");
const food = require("./food");
const seriousEats = require("./seriouseats");

// seriousEats(
//   "https://www.seriouseats.com/recipes/2019/08/korean-chilled-cucumber-soup-oi-naengguk-recipe.html"
// ).then(recipe => {
//   console.log(recipe);
// });

module.exports = {
  allRecipes,
  foodNetwork,
  ambitiousKitchen,
  epicurious,
  copykat,
  food,
  seriousEats
};
