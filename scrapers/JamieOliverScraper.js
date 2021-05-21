"use strict";

const PuppeteerScraper = require("../helpers/PuppeteerScraper");

class JamieOliverScraper extends PuppeteerScraper {
  constructor(url) {
    super(url, "jamieoliver.com/");
  }

  scrape($) {
    this.defaultSetImage($);
    const { ingredients, instructions, time, tags } = this.recipe;
    this.recipe.name = $(".single-recipe-details h1").text();
    this.recipe.description = $("meta[property='og:description']").attr(
      "content"
    );

    $(".tags-list a").each((i, el) => {
      const tag = $(el)
        .text()
        .replace(/\s\s+/g, " ")
        .trim();
      if (tag !== "") {
        tags.push(tag);
      }
    });

    $("ul.ingred-list li").each((i, el) => {
      const item = $(el)
        .text()
        .replace(/\s\s+/g, " ")
        .trim();
      if (item !== "") {
        ingredients.push(item);
      }
    });

    $("ol.recipeSteps li").each((i, el) => {
      const step = $(el)
        .text()
        .replace(/\s\s+/g, " ")
        .trim();
      if (step !== "") {
        instructions.push(step);
      }
    });

    time.cook = $(".recipe-detail.time")
      .text()
      .replace("Cooks In", "")
      .replace(/\s\s+/g, " ")
      .trim();

    time.total = time.cook;

    this.recipe.servings = $(".recipe-detail.serves")
      .text()
      .replace("Serves", "")
      .replace(/\s\s+/g, " ")
      .trim();
  }
}

module.exports = JamieOliverScraper;
