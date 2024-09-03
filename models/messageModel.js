const mongoose = require('mongoose');
const validator = require('validator');

const messageSchema = new mongoose.Schema({
  date: { type: String },

  time: { type: String },

  name: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },

  phone: {
    type: String,
  },

  email: {
    type: String,
    required: [true, 'Please provide your email.'],
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email address'],
  },

  requestType: { type: String },

  service: { type: String },

  message: { type: String },

  contactMethod: { type: String },
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
