const Registration = require('../models/registrationModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');
const AppError = require('../utils/appError');
const Email = require('../utils/registrationemail');

exports.createEmail = catchAsync(async (req, res, next) => {
  const newRegistration = await Registration.create(req.body);

  await new Email(newRegistration).sendRegistration();

  res.status(201).json({
    status: 'success',
    data: {
      data: newRegistration,
    },
  });
});

//exports.createEmail = factory.createOne(Registration);
exports.getEmail = factory.getOne(Registration);
exports.getAllEmails = factory.getAll(Registration);
exports.updateEmail = factory.updateOne(Registration);
exports.deleteEmail = factory.deleteOne(Registration);
