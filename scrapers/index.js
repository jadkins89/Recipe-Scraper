const allRecipes = require('./allrecipes');
const foodNetwork = require('./foodnetwork');

allRecipes('https://www.allrecipes.com/recipe/220727/medium-cheddar-cheese-sauce-live-raw-and-vegan/').then((recipe) => {
  recipe.ingredients.forEach( item => {
    console.log(item);
  });
  recipe.instructions.forEach( step => {
    console.log(step + '\n');
  });
  console.log(recipe.time);
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