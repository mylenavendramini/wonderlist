const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categories');

router.get('/categories', categoriesController.getCategories);
router.post('/categories', categoriesController.createCategory);
router.delete('/categories/:id', categoriesController.deleteCategory);
// TODO:
router.put('/categories/:id', categoriesController.editCategory);

module.exports = router;