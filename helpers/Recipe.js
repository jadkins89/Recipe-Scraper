class Recipe {
  constructor() {
    this.name = "";
    this.description = "";
    this.ingredients = [];
    this.instructions = [];
    this.tags = [];
    this.time = {
      prep: "",
      cook: "",
      active: "",
      inactive: "",
      ready: "",
      total: ""
    };
    this.servings = "";
    this.image = "";
  }
}

module.exports = Recipe;
