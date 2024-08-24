const Registration = require('../models/registrationModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');
const AppError = require('../utils/appError');
const Email = require('../utils/messagemail');

exports.createEmail = factory.createOne(Registration);
exports.getEmail = factory.getOne(Registration);
exports.getAllEmails = factory.getAll(Registration);
exports.updateEmail = factory.updateOne(Registration);
exports.deleteEmail = factory.deleteOne(Registration);
