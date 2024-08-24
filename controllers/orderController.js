const catchAsync = require('../utils/catchAsync');
const Order = require('../models/orderModel');
const AppError = require('../utils/appError');
const Email = require('../utils/email');
const multer = require('multer');
const sharp = require('sharp');
const factory = require('./handlerFactory');

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `public/uploads/print/`);
    console.log(req.body.orderNumber);
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];
    cb(null, `${req.body.orderNumber}-${Date.now()}.${ext}`);
  },
});

const multerFilter = (req, file, cb) => {
  const maxSize = 5 * 1024 * 1024; // 5MB
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
    // } else if (file.mimetype.startsWith('application')) {
    //   cb(null, true);
  } else {
    cb(
      new AppError(
        'Please upload only JPG, JPEG or PNG image files. All other file types must be emailed directly.',
        400
      ),
      false
    );
  }
  if (file.size > maxSize) {
    cb(
      new AppError(
        'File size is too large. Uploaded files can be no larger than 5MB.',
        400
      ),
      false
    );
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadOrderImage = upload.single('orderFile');

exports.createOrder = catchAsync(async (req, res, next) => {
  const filteredObj = (obj, ...allowedFields) => {
    const newObj = {};
    Object.keys(obj).forEach((el) => {
      if (allowedFields.includes(el)) newObj[el] = obj[el];
    });
    return newObj;
  };

  const filteredBody = filteredObj(req.body, 'orderNumber', 'orderDate');
  if (req.file) filteredBody.orderFile = req.file.filename;

  const newOrder = await Order.create(filteredBody);

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
exports.getOrder = factory.getOne(Order);
//exports.createOrder = factory.createOne(Order);
//exports.updateOrder = factory.updateOne(Order);
exports.deleteOrder = factory.deleteOne(Order);
