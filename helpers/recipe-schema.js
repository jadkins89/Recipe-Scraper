function Recipe() {
  this.name = "";
  this.ingredients = [];
  this.instructions = [];
  this.time = {
    prep: "",
    cook: "",
    active: "",
    inactive: "",
    ready: "",
    total: ""
  };
  this.servings = "";
}

module.exports = Recipe;
