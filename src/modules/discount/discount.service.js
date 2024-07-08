const autoBind = require('auto-bind');
const DiscountModel = require('./discount.model');
const createHttpError = require('http-errors');

class DiscountService {
  #model;
  constructor() {
    autoBind(this);
    this.#model = DiscountModel;
  }

  async createDiscount(discountDto) {
    const existingDiscount = await this.#model.findOne({ code: discountDto.code });
    if (existingDiscount) {
      throw new createHttpError.Conflict('Discount code already exists');
    }
    const discount = await this.#model.create(discountDto);
    return discount;
  }

  async updateDiscount(id, discountDto) {
    const discount = await this.#model.findByIdAndUpdate(id, discountDto, { new: true });
    if (!discount) {
      throw new createHttpError.NotFound('Discount not found');
    }
    return discount;
  }

  async deleteDiscount(id) {
    const discount = await this.#model.findByIdAndDelete(id);
    if (!discount) {
      throw new createHttpError.NotFound('Discount not found');
    }
  }
}

module.exports = new DiscountService();
