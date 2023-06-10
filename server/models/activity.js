const { Schema, model } = require('./index');
const { Travel } = require('./travel')

const activitySchema = new Schema({
  date: String,
  activity: String,
  isImportant: Boolean,
})


const Activity = model("Activity", activitySchema);

const getActivities = async () => {
  try {
    const activities = await Activity.find({});
    return activities;
  } catch (error) {
    console.log(error);
  }
}


const createActivity = async (activity, travelId) => {
  try {
    const newActivity = await Activity.create(activity);
    const result = await Travel.findOneAndUpdate({ _id: travelId }, { $push: { 'details.activities': newActivity._id } }, { new: true });
    return newActivity;
  } catch (error) {
    console.log(error);
  }
}

const deleteActivity = async (id) => {
  try {
    const activityToDelete = await Activity.findByIdAndDelete(id);
    return activityToDelete;
  } catch (error) {
    console.log(error);
  }
}

module.exports = { Activity, createActivity, getActivities, deleteActivity };