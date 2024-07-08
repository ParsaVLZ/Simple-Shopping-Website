const { Schema, model } = require('mongoose');

const DiscountSchema = new Schema({
  code: { type: String, required: true, unique: true },
  percentage: { type: Number, required: true },
}, { timestamps: true });

const DiscountModel = model('Discount', DiscountSchema);
module.exports = DiscountModel;
