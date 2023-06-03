export default {
  testUrl:
    "https://www.yummly.com/recipe/Gluten-Free-Sugar-Cookies-9100629",
  invalidUrl: "https://www.yummly.com/recipe/notarealurl",
  invalidDomainUrl: "www.invalid.com",
  nonRecipeUrl: "https://www.yummly.com/recipes",
  expectedRecipe: {
    name: 'Gluten Free Sugar Cookies',
    description: 'Wonderful recipe my family and friends could not tell it was gluten free.',
    ingredients: [
      '1 cup sugar',
      '1/2 cup butter softened',
      '1 egg room temperature',
      '1 tablespoon milk',
      '2 teaspoons vanilla extract',
      '1/4 teaspoon salt omit if butter is salted',
      '2 cups gluten free all purpose flour'
    ],
    instructions: [],
    sectionedInstructions: [],
    tags: [ 'Desserts', 'Sugar Cookies', 'Frosting', 'Cookies', 'Baking' ],
    time: {
      prep: '',
      cook: '',
      active: '',
      inactive: '',
      ready: '',
      total: '45 minutes'
    },
    servings: '',
    image: 'https://lh3.googleusercontent.com/iHTCX-ZrqIHcxcDWSY-c_9OHyh_ZDxDoRa1ci0IcwDeEOCshL0G9z-rB_5vJZFgsdDjR4TyZ8tR5DwCDRUj4_g=w1280-h1280-c-rj-v1-e365'
  }

};
