const mongoose = require('mongoose');
const validator = require('validator');

const quoteformSchema = new mongoose.Schema({
  date: { type: String },

  time: { type: String },

  email: {
    type: String,
    required: [true, 'Please provide your email.'],
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email address'],
  },

  service: { type: String },

  description: { type: String },

  quantity: { type: String },

  deliveryDate: { type: String },

  artFiles: { type: String },

  garments: { type: String },

  company: { type: String },

  firstName: { type: String },

  lastName: { type: String },

  phone: { type: String },
});

const Request = mongoose.model('Request', quoteformSchema);

module.exports = Request;
