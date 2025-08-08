const Recipes = require("../models/recipe");

const getRecipes = async (req, res) => {
  const recipes = await Recipes.find();
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

  const newRecipe = await Recipes.create({
    title,
    instructions,
    ingredients,
  });
  return res.json(newRecipe);
};

const updateRecipe = async (req, res) => {
  const { title, instructions, ingredients, time } = req.body;
  let recipe = await Recipes.findById(req.params.id);

  try {
    if (recipe) {
      await Recipes.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json({ title, instructions, ingredients, time });
    }
  } catch (err) {
    return res.status(404).json({ message: "Error updating recipe" });
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

module.exports = {
  getRecipes,
  getRecipe,
  addRecipe,
  updateRecipe,
  deleteRecipe,
};
