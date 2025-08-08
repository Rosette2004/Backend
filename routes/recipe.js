const express = require("express");
const {
  getRecipes,
  getRecipe,
  addRecipe,
  deleteRecipe,
  updateRecipe,
} = require("../controller/recipe");
const router = express.Router();

router.get("/", getRecipes); //get all recipes
router.get("/:id", getRecipe); //get recipe by id
router.post("/", addRecipe); //add a recipe
router.put("/:id", updateRecipe); //update a recipe
router.delete("/:id", deleteRecipe); //delete a recipe

module.exports = router;
