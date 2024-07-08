const autoBind = require('auto-bind');
const ProductModel = require('./product.model');
const CategoryModel = require('../category/category.model');
const { isValidObjectId } = require('mongoose');
const createHttpError = require('http-errors');
const { ProductMessage } = require('./product.messages');

class ProductService {
  #model;
  #categoryModel;
  constructor() {
    autoBind(this);
    this.#model = ProductModel;
    this.#categoryModel = CategoryModel;
  }

  async find() {
    return await this.#model.find({});
  }

  async findById(id) {
    await this.checkExistById(id);
    return await this.#model.findById(id);
  }

  async create(productDto) {
    if (productDto?.category) {
      if (productDto.category.trim() === "") {
        delete productDto.category;
      } else if (!isValidObjectId(productDto.category)) {
        throw new createHttpError.BadRequest(ProductMessage.InvalidCategory);
      } else {
        await this.checkExistByCategoryId(productDto.category);
      }
    }
    const product = await this.#model.create(productDto);
    return product;
  }

  async update(id, updateDto) {
    await this.checkExistById(id);
    if (updateDto?.category) {
      if (updateDto.category.trim() === "") {
        delete updateDto.category; 
      } else if (!isValidObjectId(updateDto.category)) {
        throw new createHttpError.BadRequest(ProductMessage.InvalidCategory);
      } else {
        await this.checkExistByCategoryId(updateDto.category);
      }
    }
    const updatedProduct = await this.#model.findByIdAndUpdate(id, updateDto, { new: true });
    return updatedProduct;
  }

  async remove(id) {
    await this.checkExistById(id);
    await this.#model.deleteOne({ _id: id });
    return true;
  }

  async checkExistById(id) {
    if (!isValidObjectId(id)) throw new createHttpError.BadRequest(ProductMessage.InvalidId);
    const product = await this.#model.findById(id);
    if (!product) throw new createHttpError.NotFound(ProductMessage.NotFound);
    return product;
  }

  async checkExistByCategoryId(categoryId) {
    const category = await this.#categoryModel.findById(categoryId);
    if (!category) throw new createHttpError.NotFound(ProductMessage.CategoryNotFound);
    return category;
  }
}

module.exports = new ProductService();
