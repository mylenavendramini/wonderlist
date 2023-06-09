const { Schema, model } = require('./index');

const travelSchema = new Schema({
  travelName: String,
  details: {
    cityName: String,
    startingDate: String,
    endingDate: String,
    activities: [{ type: Schema.Types.ObjectId, ref: "Activities" }],
    categories: [{ type: Schema.Types.ObjectId, ref: "Categories" }]
  }
}
)

const Travel = model("Travel", travelSchema);

const getTravelCollections = async () => {
  try {
    const travelCollections = await Travel.find({});
    return travelCollections;
  } catch (error) {
    console.log(error);
  }
}

const createTravelCollection = async (travelCollection) => {
  try {
    const newTravelCollection = await Travel.create(travelCollection);
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
