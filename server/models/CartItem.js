// server/models/CartItem.js
const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
}, {
  timestamps: true
});

cartItemSchema.index({ userId: 1, productId: 1 }, { unique: true });

const CartItem = mongoose.model('CartItem', cartItemSchema);

module.exports = CartItem;