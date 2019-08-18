const allRecipes = require("./allrecipes");
const foodNetwork = require("./foodnetwork");
const ambitiousKitchen = require("./ambitiouskitchen");
const epicurious = require("./epicurious");
const copykat = require("./copykat");

// copykat("https://copykat.com/sweet-hot-mustard/").then(recipe => {
//   console.log(recipe);
// });

// ambitiousKitchen(
//   "https://www.ambitiouskitchen.com/sweet-potato-salmon-cakes/"
// ).then(recipe => {
//   console.log(recipe);
// });

module.exports = {
  allRecipes,
  foodNetwork,
  ambitiousKitchen,
  epicurious,
  copykat
};
