const Activity = require('../models/activity');

const getActivities = async (req, res) => {
  try {
    const activities = await Activity.getActivities();
    res.status(200).send(activities);
  } catch (error) {
    res.status(400).send({ error, message: 'Could not get activities.' });
  }
}

const createActivity = async (req, res) => {
  try {
    // const activity = req.body;
    const { activityObj, travelId } = req.body;

    const newActivity = await Activity.createActivity(activityObj, travelId);
    res.status(201).send(newActivity);
  } catch (error) {
    res.status(400).send({ error, message: 'Could not create activity.' });
  }
}

const deleteActivity = async (req, res) => {
  try {
    const id = req.params.id;
    const activityToDelete = await Activity.deleteActivity(id);
    res.status(200).send(activityToDelete)
  } catch (error) {
    res.status(400).send({ error, message: 'Could not delete activity.' });
  }
}

// TODO:
const editActivity = async (req, res) => {
  try {
    const id = req.params.id;
    const changed = req.body;
    const activityToEdit = await Activity.editActivity(id, changed);
    res.status(200).send(activityToEdit)
  } catch (error) {
    res.status(400).send({ error, message: 'Could not edit activity.' });
  }
}

module.exports = { getActivities, createActivity, deleteActivity, editActivity }