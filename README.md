# recipe-scraper

**A JS package for scraping recipes from the web.**

[![Build Status](https://travis-ci.org/jadkins89/Recipe-Scraper.svg?branch=master)](https://travis-ci.org/jadkins89/Recipe-Scraper)

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
- https://www.bbc.co.uk/
- https://cookieandkate.com/
- https://copykat.com/
- https://www.epicurious.com/
- https://www.food.com/
- https://www.foodandwine.com/
- https://www.foodnetwork.com/
- https://www.seriouseats.com/
- https://www.simplyrecipes.com/
- https://smittenkitchen.com/
- https://thepioneerwoman.com/
- https://therealfoodrds.com/
- https://www.yummly.com/

## Recipe Schema

Depending on the recipe, certain fields may be left blank. All fields are represented as strings or arrays of strings.

```javascript
{
    name: "",
    ingredients: [],
    instructions: [],
    servings: "",
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

If a supported url does not contain the proper sub-url to be a valid recipe, an error message will be returned including the sub-url required.

```javascript
recipeScraper("some.improper.url").catch(error => {
  console.log(error.message);
  // => "url provided must include '#subUrl'"
});
```

## Bugs

With web scraping comes a reliance on the website being used not changing format. If this occurs we need to update our scrape. We've integrated testing that should notify us if this occurs but please reach out if you are experiencing an issue.
