const Recipes = require("../models/recipe");

// const getRecipes = async (req, res) => {
//   const recipes = await Recipes.find({ userId: req.user.id });
//   return res.json(recipes);
// };
const getRecipes = async (req, res) => {
  const search = req.query.search || "";
  const regex = new RegExp(search, "i"); // case-insensitive search
  const recipes = await Recipes.find({
    userId: req.user.id,
    title: { $regex: regex },
  });
  return res.json(recipes);
};
const getRecipe = async (req, res) => {
  const recipe = await Recipes.findById(req.params.id);
  res.json(recipe);
};

const addRecipe = async (req, res) => {
  const { title, instructions, ingredients } = req.body;

  if (!title || !ingredients || !instructions) {
    res.json({ message: "Required fields can't be empty" });
  }
  const coverImage = req.file ? `${req.file.filename}` : null;

  const newRecipe = await Recipes.create({
    title,
    instructions,
    ingredients,
    userId: req.user.id,
    coverImage,
  });
  return res.json(newRecipe);
};
const updateRecipe = async (req, res) => {
  try {
    const recipe = await Recipes.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    // Handle FormData or JSON
    const { title, instructions, ingredients, time } = req.body || {};

    const updatedData = {
      title: title || recipe.title,
      instructions: instructions || recipe.instructions,
      ingredients: ingredients
        ? ingredients
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean)
        : recipe.ingredients,
      time: time || recipe.time,
    };

    if (req.file) {
      updatedData.coverImage = req.file.filename;
    }

    const updated = await Recipes.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    return res.json(updated);
  } catch (err) {
    return res.status(500).json({ message: "Error updating recipe" });
  }
};

const deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipes.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    await Recipes.findByIdAndDelete(req.params.id);
    return res.json({ message: "Recipe deleted successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Error deleting recipe" });
  }
};
// Count recipes
countRecipes = async (req, res) => {
  try {
    const count = await Recipes.countDocuments();
    res.json({ count });
  } catch (err) {
    res.status(500).json({ error: "Failed to count recipes" });
  }
};

module.exports = {
  getRecipes,
  getRecipe,
  addRecipe,
  updateRecipe,
  deleteRecipe,
  countRecipes,
};
