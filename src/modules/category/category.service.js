const autoBind = require("auto-bind");
const CategoryModel = require("./category.model");
const ProductModel = require("../product/product.model");
const createHttpError = require("http-errors");
const { CategoryMessage } = require("./category.messages");
const { isValidObjectId, Types } = require("mongoose");
const slugify = require('slugify');

class CategoryService {
    #model
    #productModel
    constructor() {
        autoBind(this);
        this.#model = CategoryModel;
        this.#productModel = ProductModel;
    }

    async find() {
        return await this.#model.find({ parent: { $exists: false } }).populate('parent', 'name');
    }

    async findAll() {
        return await this.#model.find().populate('parent', 'name');
    }

    async remove(id) {
        await this.checkExistById(id);
        await this.#productModel.updateMany(
            { category: id },
            { $unset: { category: '' } }
        );
        await this.#model.deleteMany({ _id: id });
        return true;
    }

    async create(categoryDto) {
        if (categoryDto?.parent && categoryDto.parent.trim() !== "") {
            if (isValidObjectId(categoryDto.parent)) {
                const existCategory = await this.checkExistById(categoryDto.parent);
                categoryDto.parent = existCategory._id;
                categoryDto.parents = [
                    ...new Set(
                        ([existCategory._id.toString()].concat(
                            existCategory.parents.map(id => id.toString())
                        )).map(id => new Types.ObjectId(id))
                    )
                ];
            } else {
                throw new createHttpError.BadRequest(CategoryMessage.InvalidParentId);
            }
        } else {
            delete categoryDto.parent;
        }

        if (categoryDto?.slug) {
            categoryDto.slug = slugify(categoryDto.slug);
            await this.alreadyExistBySlug(categoryDto.slug);
        } else {
            categoryDto.slug = slugify(categoryDto.name);
        }

        const category = await this.#model.create(categoryDto);
        return category;
    }

    async checkExistById(id) {
        if (!isValidObjectId(id)) throw new createHttpError.BadRequest(CategoryMessage.InvalidId);
        const category = await this.#model.findById(id);
        if (!category) throw new createHttpError.NotFound(CategoryMessage.NotFound);
        return category;
    }

    async checkExistBySlug(slug) {
        const category = await this.#model.findOne({ slug });
        if (!category) throw new createHttpError.NotFound(CategoryMessage.NotFound);
        return category;
    }

    async alreadyExistBySlug(slug) {
        const category = await this.#model.findOne({ slug });
        if (category) throw new createHttpError.Conflict(CategoryMessage.AlreadyExist);
        return null;
    }
}

module.exports = new CategoryService();
