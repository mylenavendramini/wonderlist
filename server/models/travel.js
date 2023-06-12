const { Schema, model } = require('./index');
const { User } = require('./user');

const travelSchema = new Schema({
  travelName: String,
  details: {
    cityName: String,
    startingDate: String,
    endingDate: String,
    datesBetween: [],
    activities: [{ type: Schema.Types.ObjectId, ref: "Activity" }],
    categories: [{ type: Schema.Types.ObjectId, ref: "Categories" }]
  }
}
)

const Travel = model("Travel", travelSchema);

const getTravelCollections = async () => {
  try {
    const travelCollections = await Travel.find({});
    travelCollections.forEach((travelCol) => {
      travelCol.details.populate('activities', 'categories');
    })
    return travelCollections;
  } catch (error) {
    console.log(error);
  }
}

const createTravelCollection = async (travelCollection, userId) => {
  try {
    const newTravelCollection = await Travel.create(travelCollection);
    const result = await User.findOneAndUpdate({ _id: userId }, { $push: { travelCollections: newTravelCollection._id } }, { new: true })
    return newTravelCollection;
  } catch (error) {
    console.log(error);
  }
}

const deleteTravelCollection = async (id) => {
  try {
    const travelCollectionToDelete = await Travel.findByIdAndDelete(id);
    return travelCollectionToDelete;
  } catch (error) {
    console.log(error);
  }
}

module.exports = { Travel, getTravelCollections, createTravelCollection, deleteTravelCollection };
