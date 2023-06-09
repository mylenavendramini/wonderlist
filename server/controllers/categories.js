const CategoriesModel = require('../models/categories');

const getCategories = async (req, res) => {
  try {
    const categories = await CategoriesModel.getCategories();
    res.status(200).send(categories);
  } catch (error) {
    res.status(400).send({ error, message: 'Could not get categories.' });
  }
}

const createCategory = async (req, res) => {
  try {
    const category = req.body;
    const newCategory = await CategoriesModel.createCategory(category);
    res.status(201).send(newCategory);
  } catch (error) {
    res.status(400).send({ error, message: 'Could not create category.' });
  }
}

const deleteCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const categoryToDelete = await CategoriesModel.deleteCategory(id);
    res.status(200).send(categoryToDelete)
  } catch (error) {
    res.status(400).send({ error, message: 'Could not delete category.' });
  }
}

// TODO:
const editCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const changed = req.body;
    const categoryToEdit = await CategoriesModel.editCategory(id, changed);
    res.status(200).send(categoryToEdit)
  } catch (error) {
    res.status(400).send({ error, message: 'Could not edit category.' });
  }
}

module.exports = { getCategories, createCategory, deleteCategory, editCategory }