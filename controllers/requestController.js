const Request = require('../models/quoterequestModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');
const AppError = require('../utils/appError');
const Email = require('../utils/requestmail');

exports.createRequest = catchAsync(async (req, res, next) => {
  const newRequest = await Request.create(req.body);

  await new Email(newRequest).sendRequest();

  res.status(201).json({
    status: 'success',
    data: {
      data: newRequest,
    },
  });
});

//exports.createRequest = factory.createOne(Request);
exports.getRequest = factory.getOne(Request);
exports.getAllRequests = factory.getAll(Request);
exports.updateRequest = factory.updateOne(Request);
exports.deleteRequest = factory.deleteOne(Request);
