const { Schema, model } = require('./index');

const travelSchema = new Schema({
  travelName: String,
  details: {
    cityName: String,
    startingDate: String,
    endingDate: String,
    dates: [{ type: Schema.Types.ObjectId, ref: "Dates" }],
    categories: [{ type: Schema.Types.ObjectId, ref: "Categories" }]
  }
}
)

const Travel = model("Travel", travelSchema);

module.exports = { Travel };
