const { Router } = require('express');
const CategoryController = require('./category.controller');

const router = Router();

router.post('/', CategoryController.create);
router.get('/', CategoryController.findAll);
router.get('/root', CategoryController.find);
router.delete('/:id', CategoryController.remove);

module.exports = {
  CategoryRouter: router
};