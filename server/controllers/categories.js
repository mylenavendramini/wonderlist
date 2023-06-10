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
    const { categoryObj, travelId } = req.body;
    const newCategory = await CategoriesModel.createCategory(categoryObj, travelId);
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

const editCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const { place, address } = req.body;
    // console.log(categoryId, place, address)
    const updatedCategory = await CategoriesModel.editCategory(categoryId, place, address);
    console.log(updatedCategory)
    res.status(200).send(updatedCategory);
  } catch (error) {
    res.status(400).send({ error, message: 'Could not update category.' });
  }
}

module.exports = { getCategories, createCategory, deleteCategory, editCategory }