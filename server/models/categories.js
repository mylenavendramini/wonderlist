const { Schema, model } = require('./index');

const categoriesSchema = new Schema({
  title: String,
  place: String,
  address: String,
  icon_url: String,
})

const Categories = model("Categories", categoriesSchema);

const getCategories = async () => {
  try {
    const categories = await Categories.find({});
    return categories;
  } catch (error) {
    console.log(error);
  }
}

const createCategory = async (category) => {
  try {
    const newCategory = await Categories.create(category);
    return newCategory;
  } catch (error) {
    console.log(error);
  }
}

const deleteCategory = async (id) => {
  try {
    const categoryToDelete = await Categories.findByIdAndDelete(id);
    return categoryToDelete;
  } catch (error) {
    console.log(error);
  }
}
// TODO:
const editCategory = async (id, category) => {
  try {
    const categoryToEdit = await Categories.findByIdAndUpdate(id, category);
    return categoryToEdit;
  } catch (error) {
    console.log(error);
  }
}

module.exports = { Categories, getCategories, createCategory, deleteCategory, editCategory };