const autoBind = require('auto-bind');
const cartService = require('./cart.service');
const HttpCodes = require('http-codes');
const { CartMessage } = require('./cart.messages');

class CartController {
  #service;
  constructor() {
    autoBind(this);
    this.#service = cartService;
  }

  async getCart(req, res, next) {
    try {
      const userId = req.user._id;
      const cart = await this.#service.getCart(userId);
      return res.status(HttpCodes.OK).json(cart);
    } catch (error) {
      next(error);
    }
  }

  async addProduct(req, res, next) {
    try {
      const userId = req.user._id;
      const { productId, quantity } = req.body;
      const cart = await this.#service.addProduct(userId, productId, quantity);
      return res.status(HttpCodes.OK).json({
        message: CartMessage.ProductAdded,
        cart,
      });
    } catch (error) {
      next(error);
    }
  }

  async removeProduct(req, res, next) {
    try {
      const userId = req.user._id;
      const { productId } = req.body;
      const cart = await this.#service.removeProduct(userId, productId);
      return res.status(HttpCodes.OK).json({
        message: CartMessage.ProductRemoved,
        cart,
      });
    } catch (error) {
      next(error);
    }
  }

  async applyDiscount(req, res, next) {
    try {
      const userId = req.user._id;
      const { discountCode, discountPercentage } = req.body;
      const cart = await this.#service.applyDiscount(userId, discountCode, discountPercentage);
      return res.status(HttpCodes.OK).json({
        message: CartMessage.DiscountApplied,
        cart,
      });
    } catch (error) {
      next(error);
    }
  }

  async calculateTotal(req, res, next) {
    try {
      const userId = req.user._id;
      const cart = await this.#service.calculateTotal(userId);
      return res.status(HttpCodes.OK).json({
        message: CartMessage.TotalCalculated,
        cart,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new CartController();
