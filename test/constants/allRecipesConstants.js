module.exports = {
  testUrlOld:
    "https://www.allrecipes.com/recipe/274411/bucatini-cacio-e-pepe-roman-sheep-herders-pasta",
  testUrlNew:
    "https://www.allrecipes.com/recipe/235151/crispy-and-tender-baked-chicken-thighs/",
  invalidUrl: "https://www.allrecipes.com/recipe/notarealurl",
  invalidDomainUrl: "www.invalid.com",
  nonRecipeUrl:
    "https://www.allrecipes.com/recipes/453/everyday-cooking/family-friendly/kid-friendly/",
  expectedRecipeOld: {
    name: "Bucatini Cacio e Pepe (Roman Sheep Herder's Pasta)",
    ingredients: [
      "1 teaspoon salt",
      "1 pound bucatini (dry)",
      "2 cups finely grated Pecorino Romano cheese",
      "1 ½ tablespoons freshly ground black pepper, or more to taste"
    ],
    instructions: [
      "Bring a large pot of water to a boil and add salt. Cook bucatini in the boiling water, stirring occasionally, until tender yet firm to the bite, 8 to 10 minutes.",
      "Place grated Pecorino Romano cheese into a large glass bowl and mix with a fork to make sure the cheese contains no lumps.",
      "Once the bucatini are al dente, lift them out with a spaghetti fork or tongs and put them directly into the bowl with the cheese. Do not allow the water to drain too much.",
      "Add one ladle of pasta water to the bowl. Stir the bucatini around until a cream has formed. Add more pasta water, little by little, until a thick cream has formed. Sprinkle freshly ground pepper over the pasta. Toss and serve immediately."
    ],
    time: {
      prep: "10 mins",
      cook: "15 mins",
      active: "",
      inactive: "",
      ready: "",
      total: "25 mins"
    },
    servings: "6",
    image:
      "https://imagesvc.meredithcorp.io/v3/mm/image?q=85&c=sc&poi=face&w=2444&h=1280&url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F2253389.jpg"
  },
  expectedRecipeNew: {
    name: "Crispy and Tender Baked Chicken Thighs",
    ingredients: [
      "1 serving cooking spray",
      "8 eaches bone-in chicken thighs with skin",
      "¼ teaspoon garlic salt",
      "¼ teaspoon onion salt",
      "¼ teaspoon dried oregano",
      "¼ teaspoon ground thyme",
      "¼ teaspoon paprika",
      "¼ teaspoon ground black pepper"
    ],
    instructions: [
      "Preheat oven to 350 degrees F (175 degrees C). Line a baking sheet with aluminum foil and spray with cooking spray.",
      "Arrange chicken thighs on prepared baking sheet.",
      "Combine garlic salt, onion salt, oregano, thyme, paprika, and pepper together in a small container with a lid. Close the lid and shake container until spices are thoroughly mixed. Sprinkle spice mixture liberally over chicken thighs.",
      "Bake chicken in the preheated oven until skin is crispy, thighs are no longer pink at the bone, and the juices run clear, about 1 hour. An instant-read thermometer inserted near the bone should read 165 degrees F (74 degrees C)."
    ],
    time: {
      prep: "10 mins",
      cook: "1 hr",
      active: "",
      inactive: "",
      ready: "",
      total: "1 hr 10 mins"
    },
    servings: "8",
    image:
      "https://imagesvc.meredithcorp.io/v3/mm/image?q=85&c=sc&poi=face&w=1300&h=681&url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F1061355.jpg"
  }
};
