const allRecipes = require("./allrecipes");
const foodNetwork = require("./foodnetwork");
const ambitiousKitchen = require("./ambitiouskitchen");

allRecipes(
  "https://www.allrecipes.com/recipe/45736/chicken-tikka-masala/"
).then(recipe => {
  console.log(recipe);
});

// foodNetwork('https://www.foodnetwork.com/recipes/patrick-and-gina-neely/old-fashioned-macaroni-salad-recipe-1948708').then((recipe) => {
//   recipe.ingredients.forEach( item => {
//     console.log(item);
//   });
//   recipe.instructions.forEach( step => {
//     console.log(step + '\n');
//   });
//   console.log(recipe.time);
// });

// ambitiousKitchen(
//   "https://www.ambitiouskitchen.com/slow-cooker-pulled-chicken-sandwiches/"
// )
//   .then(recipe => {
//     console.log(recipe);
//   })
//   .catch(error => {
//     console.log(error);
//   });
