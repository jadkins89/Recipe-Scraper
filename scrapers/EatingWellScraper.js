"use strict";

const BaseScraper = require("../helpers/BaseScraper");

/**
 * Class for scraping eatingwell.com
 * @extends BaseScraper
 */
class EatingWellScraper extends BaseScraper {
    constructor(url) {
        super(url, "eatingwell.com/recipe");
    }

    scrape($) {
        this.defaultSetImage($);
        this.defaultSetDescription($);
        const {ingredients, instructions, tags, time} = this.recipe;
        this.recipe.name = $(".main-header")
            .find(".headline")
            .text()
            .trim();

        $(".ingredients-section__legend, .ingredients-item-name").each((i, el) => {
            if (
                !$(el)
                    .attr("class")
                    .includes("visually-hidden")
            ) {
                ingredients.push(
                    $(el)
                        .text()
                        .trim()
                        .replace(/\s\s+/g, " ")
                );
            }
        });

        $(".instructions-section-item").each((i, el) => {
            instructions.push(
                $(el)
                    .find("p")
                    .text()
            );
        });

        $(".nutrition-profile-item").each((i, el) => {
            tags.push(
                $(el)
                    .find("a")
                    .text()
            );
        });

        $(".recipe-meta-item").each((i, el) => {
            const title = $(el)
                .children(".recipe-meta-item-header")
                .text()
                .replace(/\s*:|\s+(?=\s*)/g, "");
            const value = $(el)
                .children(".recipe-meta-item-body")
                .text()
                .replace(/\s\s+/g, "")
                .replace(/\n/g, "");
            switch (title) {
                case "prep":
                    time.prep = value;
                    break;
                case "cook":
                    time.cook = value;
                    break;
                case "active":
                    time.active = value;
                    break;
                case "total":
                    time.total = value;
                    break;
                case "additional":
                    time.inactive = value;
                    break;
                case "Servings":
                    this.recipe.servings = value;
                    break;
                default:
                    break;
            }
        });
    }
}

module.exports = EatingWellScraper;
