const allRecipes = require("./allrecipes");
const foodNetwork = require("./foodnetwork");
const ambitiousKitchen = require("./ambitiouskitchen");
const epicurious = require("./epicurious");
const copykat = require("./copykat");

copykat("https://copykat.com/homemade-croutons-made-in-an-air-fryer/").then(
  recipe => {
    console.log(recipe);
  }
);

module.exports = {
  allRecipes,
  foodNetwork,
  ambitiousKitchen,
  epicurious,
  copykat
};
