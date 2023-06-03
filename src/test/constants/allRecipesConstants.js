export default {
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
    description: 'The Italian classic pasta cacio e pepe with cheese and pepper initially was invented by Roman sheep herders with little time and money to spend on eating. Cheap, easy, and fast.',
    ingredients: [
      '1 teaspoon salt',
      '1 pound bucatini (dry)',
      '2 cups finely grated Pecorino Romano cheese',
      '1.5 tablespoons freshly ground black pepper, or more to taste'
    ],
    instructions: [
      'Bring a large pot of water to a boil and add salt. Cook bucatini in the boiling water, stirring occasionally, until tender yet firm to the bite, 8 to 10 minutes.',
      'Place grated Pecorino Romano cheese into a large glass bowl and mix with a fork to make sure the cheese contains no lumps.',
      'Once the bucatini are al dente, lift them out with a spaghetti fork or tongs and put them directly into the bowl with the cheese. Do not allow the water to drain too much.',
      'Add one ladle of pasta water to the bowl. Stir the bucatini around until a cream has formed. Add more pasta water, little by little, until a thick cream has formed. Sprinkle freshly ground pepper over the pasta. Toss and serve immediately.'
    ],
    sectionedInstructions: [
      {
        sectionTitle: '',
        text: 'Bring a large pot of water to a boil and add salt. Cook bucatini in the boiling water, stirring occasionally, until tender yet firm to the bite, 8 to 10 minutes.',
        image: ''
      },
      {
        sectionTitle: '',
        text: 'Place grated Pecorino Romano cheese into a large glass bowl and mix with a fork to make sure the cheese contains no lumps.',
        image: ''
      },
      {
        sectionTitle: '',
        text: 'Once the bucatini are al dente, lift them out with a spaghetti fork or tongs and put them directly into the bowl with the cheese. Do not allow the water to drain too much.',
        image: ''
      },
      {
        sectionTitle: '',
        text: 'Add one ladle of pasta water to the bowl. Stir the bucatini around until a cream has formed. Add more pasta water, little by little, until a thick cream has formed. Sprinkle freshly ground pepper over the pasta. Toss and serve immediately.',
        image: ''
      }
    ],
    tags: [ 'Italian', 'Dinner' ],
    time: {
      prep: '10 minutes',
      cook: '15 minutes',
      active: '',
      inactive: '',
      ready: '',
      total: '25 minutes'
    },
    servings: '6',
    image: 'https://www.allrecipes.com/thmb/m8xq95X2doj0Ny1ZRpK4zQMsgy0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/2253389-ad6b2f4202b844169809500df2a71edc.jpg'
  },
  expectedRecipeNew:{
    name: 'Crispy and Tender Baked Chicken Thighs',
    description: 'Crispy chicken thighs are baked with a flavorful, homemade spice rub. The bone-in chicken thighs stay moist and juicy while the skin crisps up beautifully.',
    ingredients: [
      'cooking spray',
      '8 bone-in, skin-on chicken thighs',
      '0.25 teaspoon garlic salt',
      '0.25 teaspoon onion salt',
      '0.25 teaspoon dried oregano',
      '0.25 teaspoon ground thyme',
      '0.25 teaspoon ground paprika',
      '0.25 teaspoon ground black pepper'
    ],
    instructions: [
      'Preheat the oven to 350 degrees F (175 degrees C). Line a baking sheet with aluminum foil; spray foil with cooking spray.',
      'Arrange chicken thighs, skin-side up, on the prepared baking sheet.',
      'Combine garlic salt, onion salt, oregano, thyme, paprika, and pepper in a small bowl; mix until well combined.',
      'Sprinkle spice mixture liberally over chicken thighs.',
      'Bake chicken in the preheated oven until skin is crispy, thighs are no longer pink at the bone, and the juices run clear, about 1 hour. An instant-read thermometer inserted near the bone should read 165 degrees F (74 degrees C).'
    ],
    sectionedInstructions: [
      {
        sectionTitle: '',
        text: 'Preheat the oven to 350 degrees F (175 degrees C). Line a baking sheet with aluminum foil; spray foil with cooking spray.',
        image: ''
      },
      {
        sectionTitle: '',
        text: 'Arrange chicken thighs, skin-side up, on the prepared baking sheet.',
        image: 'https://www.allrecipes.com/thmb/Zm6wXyk43ow1BYcTnmmnbcetM9U=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/235151-CrispyAndTenderBakedChickenThighs-Step1-0680-113b877390ac4a27aae77c9d6aa6c351.jpg'
      },
      {
        sectionTitle: '',
        text: 'Combine garlic salt, onion salt, oregano, thyme, paprika, and pepper in a small bowl; mix until well combined.',
        image: 'https://www.allrecipes.com/thmb/lpNET-mY9S3ZmsEAGu9npIZ_4Og=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/235151-CrispyAndTenderBakedChickenThighs-Step2-0683-40d391b7217b4baeab84e1dd9257fd38.jpg'
      },
      {
        sectionTitle: '',
        text: 'Sprinkle spice mixture liberally over chicken thighs.',
        image: 'https://www.allrecipes.com/thmb/2aZXaxDN1Y-wyqw835B-xEpFKaU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/235151-CrispyAndTenderBakedChickenThighs-Step3-0686-d20aabf197514c4c898c3ca4d36f81c2.jpg'
      },
      {
        sectionTitle: '',
        text: 'Bake chicken in the preheated oven until skin is crispy, thighs are no longer pink at the bone, and the juices run clear, about 1 hour. An instant-read thermometer inserted near the bone should read 165 degrees F (74 degrees C).',
        image: 'https://www.allrecipes.com/thmb/09giW6QgqCDrIU8DEWD00jD7kIw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/235151-CrispyAndTenderChickenThighs-Step4-0741-421dbef6187545f1b63686d66d08f771.jpg'
      }
    ],
    tags: [ 'American', 'Dinner' ],
    time: {
      prep: '10 minutes',
      cook: '60 minutes',
      active: '',
      inactive: '',
      ready: '',
      total: '70 minutes'
    },
    servings: '8',
    image: 'https://www.allrecipes.com/thmb/09giW6QgqCDrIU8DEWD00jD7kIw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/235151-CrispyAndTenderChickenThighs-Step4-0741-421dbef6187545f1b63686d66d08f771.jpg'
  }
};
