const autoBind = require('auto-bind');
const discountService = require('./discount.service');
const HttpCodes = require('http-codes');

class DiscountController {
  #service;
  constructor() {
    autoBind(this);
    this.#service = discountService;
  }

  async createDiscount(req, res, next) {
    try {
      const { code, percentage } = req.body;
      const discount = await this.#service.createDiscount({ code, percentage });
      return res.status(HttpCodes.CREATED).json(discount);
    } catch (error) {
      next(error);
    }
  }

  async updateDiscount(req, res, next) {
    try {
      const { id } = req.params;
      const { code, percentage } = req.body;
      const discount = await this.#service.updateDiscount(id, { code, percentage });
      return res.status(HttpCodes.OK).json(discount);
    } catch (error) {
      next(error);
    }
  }

  async deleteDiscount(req, res, next) {
    try {
      const { id } = req.params;
      await this.#service.deleteDiscount(id);
      return res.status(HttpCodes.OK).json({ message: 'Discount deleted successfully' });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new DiscountController();
