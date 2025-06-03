// server/models/CartItem.js
const mongoose = require('mongoose');

const CartItemSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  // IMPORTANT: Remove or comment out any 'category' field definition if it's here,
  // especially if it's marked 'required: true'.
  // category: { type: String, required: true }, // <-- REMOVE THIS LINE IF IT EXISTS
});

module.exports = mongoose.model('CartItem', CartItemSchema);