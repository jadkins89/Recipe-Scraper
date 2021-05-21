# recipe-scraper

**A NodeJS package for scraping recipes from the web.**

[![Build Status](https://travis-ci.org/jadkins89/Recipe-Scraper.svg?branch=master)](https://travis-ci.org/jadkins89/Recipe-Scraper)
[![Coverage Status](https://coveralls.io/repos/github/jadkins89/Recipe-Scraper/badge.svg?branch=master)](https://coveralls.io/github/jadkins89/Recipe-Scraper?branch=master)

## Installation

```sh
npm install recipe-scraper
```

## Usage

```javascript
// import the module
const recipeScraper = require("recipe-scraper");

// enter a supported recipe url as a parameter - returns a promise
async function someAsyncFunc() {
  ...
  let recipe = await recipeScraper("some.recipe.url");
  ...
}

// using Promise chaining
recipeScraper("some.recipe.url").then(recipe => {
    // do something with recipe
  }).catch(error => {
    // do something with error
  });
```

## Supported Websites

- https://www.101cookbooks.com/
- https://www.allrecipes.com/
- https://www.ambitiouskitchen.com/
- https://www.averiecooks.com/
- https://www.bbc.co.uk/
- https://www.bbcgoodfood.com/
- https://www.bonappetit.com/
- https://www.budgetbytes.com/
- https://www.centraltexasfoodbank.org/
- https://www.closetcooking.com/
- https://cookieandkate.com/
- https://copykat.com/
- https://damndelicious.net/
- https://www.eatingwell.com/
- https://www.epicurious.com/
- https://www.food.com/
- https://www.foodandwine.com/
- https://www.foodnetwork.com/
- https://gimmedelicious.com/
- https://www.gimmesomeoven.com/
- https://julieblanner.com/
- https://www.kitchenstories.com/
- https://www.melskitchencafe.com/
- https://www.minimalistbaker.com/
- https://www.myrecipes.com/
- https://www.nomnompaleo.com/
- https://www.omnivorescookbook.com/
- https://pinchofyum.com/
- https://recipetineats.com/
- https://www.seriouseats.com/
- https://www.simplyrecipes.com/
- https://smittenkitchen.com/
- https://thepioneerwoman.com/
- https://www.tasteofhome.com/
- https://tastesbetterfromscratch.com/
- https://thatlowcarblife.com/
- https://www.theblackpeppercorn.com/
- https://therealfoodrds.com/
- https://www.thespruceeats.com/
- https://whatsgabycooking.com/
- https://www.woolworths.com.au/
- https://www.yummly.com/
- https://www.jamieoliver.com/

Don't see a website you'd like to scrape? Open an [issue](https://github.com/jadkins89/Recipe-Scraper/issues) and we'll do our best to add it.

## Recipe Object

Depending on the recipe, certain fields may be left blank. All fields are represented as strings or arrays of strings. The name, ingredients, and instructions properties are required for schema validation.

```javascript
{
    name: "",
    ingredients: [],
    instructions: [],
    tags: [],
    servings: "",
    image: "",
    time: {
      prep: "",
      cook: "",
      active: "",
      inactive: "",
      ready: "",
      total: ""
    }
}
```

## Error Handling

If the url provided is invalid and a domain is unable to be parsed, an error message will be returned.

```javascript
recipeScraper("keyboard kitty").catch(error => {
  console.log(error.message);
  // => "Failed to parse domain"
});
```

If the url provided doesn't match a supported domain, an error message will be returned.

```javascript
recipeScraper("some.invalid.url").catch(error => {
  console.log(error.message);
  // => "Site not yet supported"
});
```

If a recipe is not found on a supported domain site, an error message will be returned.

```javascript
recipeScraper("some.no.recipe.url").catch(error => {
  console.log(error.message);
  // => "No recipe found on page"
});
```

If a page does not exist or some other 400+ error occurs when fetching, an error message will be returned.

```javascript
recipeScraper("some.nonexistent.page").catch(error => {
  console.log(error.message);
  // => "No recipe found on page"
});
```

If a supported url does not contain the proper sub-url to be a valid recipe, an error message will be returned including the sub-url required.

```javascript
recipeScraper("some.improper.url").catch(error => {
  console.log(error.message);
  // => "url provided must include '#subUrl'"
});
```

## Bugs

With web scraping comes a reliance on the website being used not changing format. If this occurs we need to update our scrape. Please reach out if you are experiencing an issue.

## Contributing

I welcome pull requests that keep the scrapes up to date or add new ones. I'm doing my best to keep this package maintained and with your help this goal is much more achievable. Please add testing if you add a scrape. Thank you 😁
