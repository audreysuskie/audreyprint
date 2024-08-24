const mongoose = require('mongoose');
const validator = require('validator');

const emailSchema = new mongoose.Schema({
  date: { type: String },

  time: { type: String },

  email: {
    type: String,
    required: [true, 'Please provide your email.'],
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email address'],
  },
});

const Registration = mongoose.model('Registration', emailSchema);

module.exports = Registration;
