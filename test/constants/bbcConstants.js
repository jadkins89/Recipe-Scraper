module.exports = {
  testUrl: "https://www.bbc.co.uk/food/recipes/sausage_and_gnocchi_bake_80924",
  invalidUrl: "https://www.bbc.co.uk/food/recipes/notarealurl",
  invalidDomainUrl: "www.invalid.com",
  nonRecipeUrl: "https://www.bbc.co.uk/food/recipes/",
  expectedRecipe: {
    name: "Sausage bake with gnocchi",
    ingredients: [
      "1 red pepper, deseeded and cut into chunks",
      "1 yellow pepper, deseeded and cut into chunks",
      "1 orange pepper, deseeded and cut into chunks",
      "250g/9oz gnocchi",
      "1 tbsp olive oil",
      "4 pork sausages",
      "salt and freshly ground black pepper"
    ],
    instructions: [
      "Preheat the oven to 200C/180C Fan/Gas 6.",
      "Toss together the peppers, gnocchi, olive oil and a generous amount of salt and pepper on a large baking tray.",
      "Place the sausages on the tray. Roast for 25 minutes, or until the sausages and gnocchi are golden-brown and the peppers are soft and have started to brown around the edges. Serve."
    ],
    time: {
      prep: "less than 30 mins",
      cook: "10 to 30 mins",
      active: "",
      inactive: "",
      ready: "",
      total: ""
    },
    servings: "Serves 2",
    image:
      "https://ichef.bbci.co.uk/food/ic/food_16x9_448/recipes/sausage_and_gnocchi_bake_80924_16x9.jpg"
  }
};
