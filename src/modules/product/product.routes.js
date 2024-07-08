const { Router } = require('express');
const ProductController = require('./product.controller');
const router = Router();

router.post('/', ProductController.create);
router.get('/', ProductController.find);
router.get('/:id', ProductController.findById);
router.put('/:id', ProductController.update);
router.delete('/:id', ProductController.remove);

module.exports = {
  ProductRouter: router,
};
