const express = require("express");
const upload = require("../middleware/upload");
const {
  getRecipes,
  getRecipe,
  addRecipe,
  deleteRecipe,
  updateRecipe,
  countRecipes,
} = require("../controller/recipe");
const router = express.Router();
const auth = require("../middleware/auth");
router.get("/count", countRecipes);

router.get("/", auth, getRecipes); //get all recipes
router.get("/:id", auth, getRecipe); //get recipe by id
router.post("/", auth, upload.single("coverImage"), addRecipe); //add a recipe
router.put("/:id", auth, upload.single("coverImage"), updateRecipe); //update a recipe
router.delete("/:id", auth, deleteRecipe); //delete a recipe

module.exports = router;
