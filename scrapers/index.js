const allRecipes = require('./allrecipes');

allRecipes('https://www.allrecipes.com/recipe/254217/impossible-cake/').then((recipe) => {
  recipe.ingredients.forEach( item => {
    console.log(item);
  });
  recipe.instructions.forEach( step => {
    console.log(step + '\n');
  });
  console.log(recipe.time);
});