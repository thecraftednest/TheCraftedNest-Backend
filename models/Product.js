// models/Product.js

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  sizes: [
    {
      size: String,
      price: Number,
    }
  ],
  image: {
    data: Buffer,
    contentType: String,
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model('Product', productSchema);
