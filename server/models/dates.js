const { Schema, model } = require('./index');

const datesSchema = new Schema({
  date: String,
  details: {
    activity: String,
    isImportant: Boolean,
  }
})

const Dates = model("Dates", datesSchema);

module.exports = { Dates };