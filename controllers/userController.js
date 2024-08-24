const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');
const AppError = require('../utils/appError');

exports.getAccount = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

// UPDATE USER
exports.updateUser = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password updates. Please use /updatePassword.',
        404
      )
    );
  }

  const updatedUser = await User.findByIdAndUpdate(req.user.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});

// UPDATE SAVED ITEMS
exports.updateSaved = catchAsync(async (req, res, next) => {
  const saved = {
    saved: {
      brand: req.body.brand,
      item: req.body.styleid,
      style: req.body.style,
    },
  };

  const updatedUser = await User.findByIdAndUpdate(req.user.id, saved);

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new AppError(`No user found with that ID`, 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

exports.createUser = factory.createOne(User);
//exports.getUser = factory.getOne(User);
exports.getAllUsers = factory.getAll(User);
//exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);
