const express = require('express');
const router = express.Router();
const activitiesController = require('../controllers/activities');

// console.log('test')

router.get('/activities', activitiesController.getActivities);
router.post('/activities', activitiesController.createActivity);
router.delete('/activities/:id', activitiesController.deleteActivity);
router.put('/activities/:id', activitiesController.editActivity);

module.exports = router;