const catchAsync = require('../utils/catchAsync');
const Order = require('../models/orderModel');
const AppError = require('../utils/appError');
const Email = require('../utils/email');
const multer = require('multer');
const sharp = require('sharp');
const factory = require('./handlerFactory');
const fs = require('fs');
const path = require('path');

// Custom file upload middleware
const uploadMiddleware = (req, res, next) => {
  // Configure multer storage and file name
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/uploads/print/');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
    },
  });

  // Create multer upload instance
  const upload = multer({ storage: storage });
  // Use multer upload instance
  upload.array('transferFiles', 5)(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    // Retrieve uploaded files
    console.log(req.files);
    const files = req.files;
    const errors = [];

    // Validate file types and sizes
    files.forEach((file) => {
      const allowedTypes = ['image/jpeg', 'image/png'];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (!allowedTypes.includes(file.mimetype)) {
        errors.push(`Invalid file type: ${file.originalname}`);
      }

      if (file.size > maxSize) {
        errors.push(`File too large: ${file.originalname}`);
      }
    });

    // Handle validation errors
    if (errors.length > 0) {
      // Remove uploaded files
      files.forEach((file) => {
        fs.unlinkSync(file.path);
      });

      return res.status(400).json({ errors });
    }

    // Attach files to the request object
    req.files = files;

    // Proceed to the next middleware or route handler
    next();
  });
};

module.exports = uploadMiddleware;

// exports.getAllOrders = factory.getAll(Order);
// exports.getOrder = factory.getOne(Order);
// exports.createOrder = factory.createOne(Order);
// exports.updateOrder = factory.updateOne(Order);
// exports.deleteOrder = factory.deleteOne(Order);
