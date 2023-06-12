const { Schema, model } = require('./index');
const { Travel } = require('./travel')

const categoriesSchema = new Schema({
  cityName: String,
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

const createCategory = async (category, travelId) => {
  try {
    console.log(category)
    const newCategory = await Categories.create(category);
    const result = await Travel.findOneAndUpdate({ _id: travelId }, { $push: { 'details.categories': newCategory._id } }, { new: true });
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


const editCategory = async (categoryId, place, address) => {
  try {
    console.log(categoryId, 'catid')
    console.log(place, 'place')
    console.log(address, 'address')
    const updatedCategory = await Categories.findOneAndUpdate(
      { _id: categoryId },
      { $set: { place, address } },
      { new: true }
    );
    console.log(updatedCategory, 'updated cat')
    return updatedCategory;
  } catch (error) {
    console.log(error);
  }
}

module.exports = { Categories, getCategories, createCategory, deleteCategory, editCategory };