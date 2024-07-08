const { Schema, model, Types } = require('mongoose');

const CartItemSchema = new Schema({
  product: { type: Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true, default: 1 },
});

const CartSchema = new Schema({
  user: { type: Types.ObjectId, ref: 'User', required: true },
  items: [ CartItemSchema ],
  total: { type: Number, default: 0 },
  discountCode: { type: String, default: '' },
  discountPercentage: { type: Number, default: 0 },
}, { timestamps: true, toJSON: { versionKey: false} });

const CartModel = model('Cart', CartSchema);

module.exports = CartModel;
