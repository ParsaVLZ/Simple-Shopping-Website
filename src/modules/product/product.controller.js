const autoBind = require('auto-bind');
const productService = require('./product.service');

const HttpCodes = require('http-codes');
const ProductMessage = require('./product.messages');

class ProductController {
  #service;
  constructor() {
    autoBind(this);
    this.#service = productService;
  }

  async create(req, res, next) {
    try {
      const { name, description, price, category } = req.body;
      const product = await this.#service.create({ name, description, price, category });
      return res.status(HttpCodes.CREATED).json({
        message: ProductMessage.Created,
        product,
      });
    } catch (error) {
      next(error);
    }
  }

  async find(req, res, next) {
    try {
      const products = await this.#service.find();
      return res.json(products);
    } catch (error) {
      next(error);
    }
  }

  async findById(req, res, next) {
    try {
      const { id } = req.params;
      const product = await this.#service.findById(id);
      return res.json(product);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const updateData = req.body;
      const updatedProduct = await this.#service.update(id, updateData);
      return res.json({
        message: ProductMessage.Updated,
        product: updatedProduct,
      });
    } catch (error) {
      next(error);
    }
  }

  async remove(req, res, next) {
    try {
      const { id } = req.params;
      await this.#service.remove(id);
      return res.json({
        message: ProductMessage.Deleted,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ProductController();
