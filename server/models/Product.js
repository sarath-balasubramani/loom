const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  cat: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  mrp: Number,
  tag: String,
  tile: String,
  shape: String,
  feat: {
    type: Boolean,
    default: false
  },
  batch: {
    type: String,
    required: true,
    unique: true
  },
  colors: [String]
}, {
  timestamps: true
});

module.exports = mongoose.model(
  "Product",
  productSchema
);
