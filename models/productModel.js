const mongoose = require('mongoose');
const validator = require('validator');
const slugify = require('slugify');

const productSchema = new mongoose.Schema({
  item: { type: Number },
  brand: { type: String },
  styleID: { type: String },
  title: { type: String },
  description: { type: String },
  category: { type: String },
  brandImage: { type: String },
  styleImage: { type: String },
  SustainableStyle: { type: String },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
