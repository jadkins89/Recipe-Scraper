module.exports = {
  testUrl: "https://www.woolworths.com.au/shop/recipedetail/7440/bean-tomato-nachos",
  invalidUrl: "https://woolworths.com.au/shop/recipedetail/notarealurl",
  invalidDomainUrl: "www.invalid.com",
  nonRecipeUrl:
    "https://www.woolworths.com.au/shop/recipedetail/0000/not-a-recipe",
  expectedRecipe: {
    name: "Bean & Tomato Nachos",
    description: "Try our easy to follow Bean & Tomato Nachos recipe. Absolutely delicious with the best ingredients from Woolworths.",
    ingredients: [
        "1 small red capsicum deseeded, diced",
        "2 tsp coriander (plus 1 bunch coriander chopped)",
        "1 small red onion roughly chopped",
        "2 avocados",
        "0.33 cup light sour cream (optional)",
        "400g can cannellini beans drained, rinsed",
        "2 tbs lime juice",
        "2 tbs extra virgin olive oil",
        "2 tsp cumin",
        "1 tsp smoked paprika",
        "400g can red kidney beans drained, rinsed",
        "200g corn chips",
        "400g solanato tomatoes",
        "2 cup low-fat tasty cheese grated"
    ],
    instructions: [
      "Heat a frying pan over medium heat. Add spices and dry fry for 1-2 minutes or until fragrant (see tip).",
      "Add onion, 1/2 the beans and 1/2 the tomatoes to a food processor. Using the pulse button, process until chopped. Transfer to a bowl and stir in spices, capsicum, 1 tbs of the lime juice, 1/4 cup coriander, remaining beans and oil.",
      "Preheat oven to 180°C. Layer bean mix, corn chips and cheese into 1 large or 4 individual ovenproof serving dishes. Bake for 15 minutes or until cheese is melted.",
      "Meanwhile, halve remaining tomatoes and place into a bowl. Scoop flesh from avocados and dice. Gently toss with tomatoes, remaining lime juice and 2 tbs coarsely chopped coriander. Serve nachos topped with salsa and sour cream, if using."
    ],
    tags: [
        "Nachos",
        "Wheat Free",
        "Gluten Free",
        "Vegetarian",
        "Egg Free",
        "Mexican",
        "Entree"
    ],
    time: {
      prep: "15 minutes",
      cook: "20 minutes",
      active: "",
      inactive: "",
      ready: "",
      total: "35 minutes"
    },
    servings: "4",
    image: "https://woolworths.scene7.com/is/image/woolworthsgroupprod/1804-bean-and-tomato-nachos?wid=1300&hei=1300"
  }
};
