module.exports = {
  testUrl:
    "https://www.woolworths.com.au/shop/recipedetail/5156/classic-guacamole",
  invalidUrl: "https://woolworths.com.au/shop/recipedetail/notarealurl",
  invalidDomainUrl: "www.invalid.com",
  nonRecipeUrl:
    "https://www.woolworths.com.au/shop/recipedetail/0000/not-a-recipe",
  expectedRecipe: {
    name: "Classic Guacamole",
    ingredients: [
      "1 small red onion",
      "1-2 fresh red chillies",
      "3 ripe avocados",
      "1 bunch of fresh coriander",
      "6 ripe cherry tomatoes",
      "2 limes",
      "Pantry Staples",
      "extra virgin olive oil"
    ],
    instructions: [
      "Peel the onion and deseed 1 chilli, then roughly chop it all on a large board.",
      "Destone the avocados and scoop the flesh onto the board.",
      "Start chopping it all together until fine and well combined.",
      "Pick over most of the coriander leaves, roughly chop and add the tomatoes, then continue chopping it all together.",
      "Squeeze in the juice from 1 lime and 1 tablespoon of oil, then season to taste with sea salt, black pepper and more lime juice, if needed.",
      "Deseed, finely chop and scatter over the remaining chilli if you like more of a kick.",
      "Pick over the reserved coriander leaves, then serve.",
      "Tip: Super quick and easy, this guacamole recipe is delicious with fajitas, quesadillas, dolloped into a wrap or served as a snack with crunchy veggies."
    ],
    time: {
      prep: "15",
      cook: "15",
      active: "",
      inactive: "",
      ready: "",
      total: ""
    },
    servings: "8",
    image:
      "https://cdn1.woolworths.media/content/recipes/1701-jamie-classicguacamole.jpg"
  }
};
