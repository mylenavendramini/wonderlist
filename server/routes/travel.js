const express = require('express');
const router = express.Router();
const travelController = require('../controllers/travel');

router.get('/travelCollections', travelController.getTravelCollections);
router.post('/travelCollections', travelController.createTravelCollection);
router.delete('/travelCollections/:id', travelController.deleteTravelCollection);

module.exports = router;