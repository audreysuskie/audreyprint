const catchAsync = require('../utils/catchAsync');
const Order = require('../models/orderModel');
const AppError = require('../utils/appError');
const Email = require('../utils/email');
const multer = require('multer');
const factory = require('./handlerFactory');
const fs = require('fs-extra');

const storageConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${req.body.orderNumber}-${file.originalname}`);
  },
});

const upload = multer({ storage: storageConfig });

exports.uploadOrderFiles = upload.array('orderFiles');

exports.processOrderFiles = catchAsync(async (req, res, next) => {
  const uploadedFiles = req.files;
  const orderFiles = [];
  for (let i = 0; i < uploadedFiles.length; i++) {
    orderFiles.push(uploadedFiles[i].filename);
  }
  const newOrder = await Order.create({
    orderFiles: orderFiles,
    orderNumber: req.body.orderNumber,
    orderDate: req.body.orderDate,
  });

  res.status(201).json({
    status: 'success',
    order: newOrder._id,
    data: {
      order: newOrder,
    },
  });
});

exports.updateOrder = catchAsync(async (req, res, next) => {
  const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!updatedOrder) {
    return next(new AppError(`No document found with that ID`, 404));
  }

  res.status(200).json({
    status: 'success',
    order: updatedOrder._id,
    data: {
      data: updatedOrder,
    },
  });
});

exports.getAllOrders = factory.getAll(Order);
exports.getOrder = factory.getOne(Order, { path: 'reviews' });
exports.createOrder = factory.createOne(Order);
//exports.updateOrder = factory.updateOne(Order);
exports.deleteOrder = factory.deleteOne(Order);
