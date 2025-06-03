// server/models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  brand: {
    type: String,
    trim: true,
  },
  model: {
    type: String,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['laptops', 'smart_phones', 'smart_watches', 'accessories', 'gaming_consoles'],
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  currency: {
    type: String,
    default: 'EGP',
    trim: true,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0,
  },
  reviews: {
    type: Number,
    min: 0,
    default: 0,
  },
  image: {
    type: String,
    trim: true,
  },
  specifications: {
    type: mongoose.Schema.Types.Mixed,
    default: {},
  },
  isFeatured: {
    type: Boolean,
    default: false,
  }
}, {
  timestamps: true
});

productSchema.index({ category: 1, name: 1 });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;