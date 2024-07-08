const autoBind = require('auto-bind');
const CartModel = require('./cart.model');
const ProductModel = require('../product/product.model');
const DiscountModel = require('../discount/discount.model');
const createHttpError = require('http-errors');
const { CartMessage } = require('./cart.messages');
const { ProductMessage } = require('../product/product.messages');

class CartService {
  #model;
  #productModel;
  #discountModel;
  constructor() {
    autoBind(this);
    this.#model = CartModel;
    this.#productModel = ProductModel;
    this.#discountModel = DiscountModel;
  }

  async getCart(userId) {
    let cart = await this.#model.findOne({ user: userId }).populate('items.product');
    if (!cart) {
      cart = new this.#model({ user: userId, items: [] });
      await cart.save();
    }
    return cart;
  }

  async addProduct(userId, productId, quantity = 1) {
    quantity = parseInt(quantity);
    const product = await this.#productModel.findById(productId);
    if (!product) {
      throw new createHttpError.NotFound(ProductMessage.NotFound);
    }

    let cart = await this.#model.findOne({ user: userId }).populate('items.product');
    if (!cart) {
      cart = new this.#model({ user: userId, items: [] });
    }
    
    const existingItemIndex = cart.items.findIndex(item => item.product._id.equals(productId));
    if (existingItemIndex > -1) {
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }

    cart = await this.calculateAndSaveTotal(cart);
    return cart;
  }

  async removeProduct(userId, productId) {
    let cart = await this.#model.findOne({ user: userId }).populate('items.product');
    if (!cart) {
      throw new createHttpError.NotFound(CartMessage.NotFound);
    }
    cart.items = cart.items.filter(item => !item.product._id.equals(productId));
    if (cart.items.length === 0) {
      cart.discountCode = '';
      cart.discountPercentage = 0;
    }
    cart = await this.calculateAndSaveTotal(cart);
    return cart;
  }

  async applyDiscount(userId, discountCode) {
    let cart = await this.#model.findOne({ user: userId }).populate('items.product');
    if (!cart) {
      throw new createHttpError.NotFound(CartMessage.NotFound);
    }

    const discount = await this.#discountModel.findOne({ code: discountCode });
    if (!discount) {
      throw new createHttpError.BadRequest(CartMessage.InvalidDiscount);
    }
    cart.discountCode = discountCode;
    cart.discountPercentage = discount.percentage;
    cart = await this.calculateAndSaveTotal(cart);
    return cart;
  }

  async calculateTotal(userId) {
    let cart = await this.#model.findOne({ user: userId }).populate('items.product');
    if (!cart) {
      throw new createHttpError.NotFound(CartMessage.NotFound);
    }
    cart = await this.calculateAndSaveTotal(cart);
    return cart;
  }

  async calculateAndSaveTotal(cart) {
    let total = 0;
    for (const item of cart.items) {
      if (item.product && item.product.price) {
        total += item.product.price * item.quantity;
      } else {
        const product = await this.#productModel.findById(item.product);
        if (product && product.price) {
          total += product.price * item.quantity;
        }
      }
    }
    if (cart.discountPercentage) {
      total -= (total * cart.discountPercentage) / 100;
    }
    cart.total = isNaN(total) ? 0 : total;
    await cart.save();
    return cart.populate('items.product'); 
  }
}

module.exports = new CartService();
