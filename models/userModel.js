const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  active: { type: Boolean, default: true },

  customerNumber: { type: Number },

  name: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },

  company: { type: String },

  address: {
    street1: String,
    street2: String,
    city: String,
    state: String,
    country: String,
    zip: String,
  },

  billingAddress: {
    bstreet1: String,
    bstreet2: String,
    bcity: String,
    bstate: String,
    bcountry: String,
    bzip: String,
  },

  shippingAddress: {
    sstreet1: String,
    sstreet2: String,
    scity: String,
    sstate: String,
    scountry: String,
    szip: String,
  },

  phone: {
    type: String,
  },

  email: {
    type: String,
    required: [true, 'Please provide your email.'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email address'],
  },

  password: {
    type: String,
    required: [true, 'A password is required!'],
    minlength: 8,
    select: false,
  },

  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      validator: function (e) {
        return this.password === e;
      },
      message: 'Passwords entered do not match',
    },
  },

  passwordChangedAt: { type: Date, default: new Date() },
  passwordResetToken: String,
  passwordResetExpires: Date,

  saved: { type: Array },

  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  terms: { type: String, default: 'Due Upon Receipt' },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  // Hash the password with the cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // Delete Password Confirm Field from Database
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
