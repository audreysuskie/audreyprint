const Request = require('../models/quoterequestModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');
const AppError = require('../utils/appError');
const Email = require('../utils/messagemail');

exports.createRequest = factory.createOne(Request);
exports.getRequest = factory.getOne(Request);
exports.getAllRequests = factory.getAll(Request);
exports.updateRequest = factory.updateOne(Request);
exports.deleteRequest = factory.deleteOne(Request);
