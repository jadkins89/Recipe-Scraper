"use strict";

const BaseScraper = require("../helpers/BaseScraper");

class AverieCooksScraper extends BaseScraper {
  constructor(url) {
    super(url, "averiecooks.com/");
  }

  scrape($) {
    this.defaultSetImage($);
    const { ingredients, instructions, time } = this.recipe;
    this.recipe.name = $(".innerrecipe")
      .children("h2")
      .first()
      .text();

    const jsonLD = $("script[type='application/ld+json']:not(.yoast-schema-graph)")[0];
    if (jsonLD && jsonLD.children && jsonLD.children[0].data) {
      const jsonRaw = jsonLD.children[0].data;
      const result = JSON.parse(jsonRaw);
      this.recipe.description = result.description;
    } else {
      this.defaultSetDescription($);
    }

    $(".cookbook-ingredients-list")
      .children("li")
      .each((i, el) => {
        ingredients.push(
          $(el)
            .text()
            .trim()
            .replace(/\s\s+/g, " ")
        );
      });

    $(".instructions")
      .find("li")
      .each((i, el) => {
        instructions.push($(el).text());
      });

    $(".recipe-meta")
      .children("p")
      .each((i, el) => {
        const title = $(el)
          .children("strong")
          .text()
          .replace(/\s*:|\s+(?=\s*)/g, "");
        const value = $(el)
          .text()
          .replace(/[^:]*:/, "")
          .trim();
        switch (title) {
          case "PrepTime":
            time.prep = value;
            break;
          case "CookTime":
            time.cook = value;
            break;
          case "TotalTime":
            time.total = value;
            break;
          case "Yield":
            this.recipe.servings = value;
            break;
          default:
            break;
        }
      });
  }
}

module.exports = AverieCooksScraper;
