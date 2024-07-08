const { Router } = require('express');
const cartController = require('./cart.controller');
const Authorization = require('../../common/guard/authorization.guard');

const router = Router();

router.get('/', Authorization, cartController.getCart);
router.post('/add-product', Authorization, cartController.addProduct);
router.post('/remove-product', Authorization, cartController.removeProduct);
router.post('/apply-discount', Authorization, cartController.applyDiscount);
router.get('/calculate-total', Authorization, cartController.calculateTotal);

module.exports = {
  CartRouter: router,
};
