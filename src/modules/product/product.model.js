const { Schema, model, Types } = require('mongoose');

const ProductSchema = new Schema({
    name: {type: String, required: true},
    description: {type: String},
    price: {type: Number, required: true, default: 0},
    category: {type: Types.ObjectId, ref: 'Category', required: true},
},{ versionKey: false, timestamps: true});

const ProductModel = model('Product', ProductSchema);

module.exports = ProductModel;