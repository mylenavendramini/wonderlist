const { Schema, model } = require('./index');

const categoriesSchema = new Schema({
  categoryName: String,
  details: {
    place: {
      placeName: String,
      placeAddress: String,
    }
  }
})

const Categories = model("Categories", categoriesSchema);

module.exports = { Categories };