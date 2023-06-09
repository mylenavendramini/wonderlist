const express = require('express');
const router = express.Router();
const activitiesController = require('../controllers/activities');

router.get('/activities', activitiesController.getActivities);
router.post('/activities', activitiesController.createActivity);
router.delete('/activities/:id', activitiesController.deleteActivity);
// TODO:
router.put('/activities/:id', activitiesController.editActivity);

module.exports = router;