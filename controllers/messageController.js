const User = require('../models/userModel');
const Message = require('../models/messageModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');
const AppError = require('../utils/appError');
const Email = require('../utils/messagemail');

exports.createMessage = catchAsync(async (req, res, next) => {
  const newMessage = await Message.create(req.body);

  await new Email(newMessage).sendMessage();

  res.status(201).json({
    status: 'success',
    data: {
      data: newMessage,
    },
  });
});

//exports.createMessage = factory.createOne(Message);
exports.getMessage = factory.getOne(Message);
exports.getAllMessages = factory.getAll(Message);
exports.updateMessage = factory.updateOne(Message);
exports.deleteMessage = factory.deleteOne(Message);
