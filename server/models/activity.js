const { Schema, model } = require('./index');

const activitySchema = new Schema({
  date: String,
  activity: String,
  isImportant: Boolean,
})


const Activity = model("Activity", activitySchema);

const createActivity = async (activity) => {
  try {
    const newActivity = await Activity.create(activity);
    return newActivity;
  } catch (error) {
    console.log(error);
  }
}

module.exports = { Activity, createActivity };