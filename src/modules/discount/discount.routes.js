const { Router } = require('express');
const discountController = require('./discount.controller');
const Authorization = require('../../common/guard/authorization.guard');

const router = Router();

router.post('/', Authorization, discountController.createDiscount);
router.put('/:id', Authorization, discountController.updateDiscount);
router.delete('/:id', Authorization, discountController.deleteDiscount);

module.exports = {
  DiscountRouter: router,
};
