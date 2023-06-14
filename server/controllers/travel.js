const TravelModel = require('../models/travel');

const getTravelCollections = async (req, res) => {
  try {
    const travelCollections = await TravelModel.getTravelCollections();
    res.status(200).send(travelCollections);
  } catch (error) {
    res.status(400).send({ error, message: 'Could not get travel collections.' });
  }
}

const createTravelCollection = async (req, res) => {
  try {
    const { travelCollection, userId } = req.body;
    const newTravelCollection = await TravelModel.createTravelCollection(travelCollection, userId);
    res.status(201).send(newTravelCollection);
  } catch (error) {
    res.status(400).send({ error, message: 'Could not create travel collection.' });
  }
}

const deleteTravelCollection = async (req, res) => {
  try {
    const id = req.params.id;
    const travelCollectionToDelete = await TravelModel.deleteTravelCollection(id);
    res.status(200).send(travelCollectionToDelete)
  } catch (error) {
    res.status(400).send({ error, message: 'Could not delete travelCollection.' });
  }
}

module.exports = { getTravelCollections, createTravelCollection, deleteTravelCollection }