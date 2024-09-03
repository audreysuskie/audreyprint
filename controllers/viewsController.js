const User = require('../models/userModel');
const Product = require('../models/productModel');
const Message = require('../models/messageModel');
const Order = require('../models/orderModel');
const Registration = require('../models/registrationModel');
const Request = require('../models/quoterequestModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const { request } = require('express');

exports.alerts = (req, res, next) => {
  const { alert } = req.query;
  if (alert === 'order')
    res.locals.alert =
      'Your order has been placed! Please check your email for confirmation. Your new order will appear on this page shortly.';
  next();
};

exports.checkEmail = (req, res) => {
  res.status(200).render('email/request');
};

exports.tempPage = catchAsync(async (req, res) => {
  res.status(200).render('newtemp', {
    title: 'This Page is Not Available Yet',
  });
});
exports.thankyouPage = catchAsync(async (req, res) => {
  res.status(200).render('thankyou', {
    title: 'Thank You',
  });
});

exports.homePage = catchAsync(async (req, res) => {
  res.status(200).render('index', {
    title: 'Home Page',
  });
});

exports.dtfPage = catchAsync(async (req, res) => {
  res.status(200).render('newdtf', {
    title: 'What are DTF Transfers?',
  });
});

exports.applicationPage = catchAsync(async (req, res) => {
  res.status(200).render('application', {
    title: 'Transfer Application and Care',
  });
});

exports.contactPage = catchAsync(async (req, res) => {
  res.status(200).render('contact', {
    title: 'Contact Page',
  });
});

exports.billingPage = catchAsync(async (req, res) => {
  res.status(200).render('billing', {
    title: 'Billing Page',
  });
});

exports.shippingPage = catchAsync(async (req, res) => {
  res.status(200).render('shipping', {
    title: 'Shipping Page',
  });
});

exports.savedPage = catchAsync(async (req, res) => {
  res.status(200).render('saved', {
    title: 'Saved Items',
  });
});

exports.filterPage = catchAsync(async (req, res) => {
  const products = await Product.find(req.query);

  res.status(200).render('printwear', {
    title: 'Filter Products',
    products,
  });
});

exports.tanktopPage = catchAsync(async (req, res) => {
  const products = await Product.find({
    title: {
      $regex: 'Tank',
      $options: 'i',
    },
  });
  let queryName = '"Tank Tops"';
  res.status(200).render('printwear2', {
    title: 'Tank Tops',
    products,
    queryName,
  });
});

exports.productsPage = catchAsync(async (req, res) => {
  const products = await Product.find(req.query);
  const queryObj = { ...req.query };
  let queryStr = JSON.stringify(queryObj);
  queryStr = queryStr.replace('"', '').replace('{', '').replace('}', '');
  let queryFilter = queryStr.split(':')[0];
  let queryName = queryStr.split(':')[1];
  let viewAll = 'View All';

  res.status(200).render('printwear2', {
    title: 'All Products',
    products,
    queryFilter,
    queryName,
    viewAll,
  });
});

exports.productPage = catchAsync(async (req, res) => {
  const product = await Product.findOne({ _id: req.query.id });
  let brandSlug = '';
  if (product.brand === 'BELLA+CANVAS') {
    brandSlug = 'bella';
  } else if (product.brand === 'PRIM + PREUX') {
    brandSlug = 'primxpreux';
  } else {
    brandSlug = product.brand
      .replace("'", '')
      .replace('.', '')
      .split(' ')
      .join('_')
      .toLowerCase();
  }
  res.status(200).render('productpage', {
    title: 'Get One Product',
    product,
    brandSlug,
  });
});

exports.profilePage = catchAsync(async (req, res) => {
  const orders = await Order.find({ customerID: req.user.id });
  res.status(200).render('account', {
    title: 'Your Account',
    orders,
  });
});

exports.printOrderPage = catchAsync(async (req, res) => {
  const orderID = req.query.order;
  const order = await Order.findOne({ _id: orderID });
  res.status(200).render('printorderform', {
    title: 'Print Order Form',
    order: order,
  });
});

exports.transferOrderPage = catchAsync(async (req, res) => {
  const orderID = req.query.order;
  const order = await Order.findOne({ _id: orderID });
  res.status(200).render('transferorderform', {
    title: 'Transfer Order Form',
    order: order,
  });
});

exports.orderPage = catchAsync(async (req, res) => {
  res.status(200).render('orderform', {
    title: 'Order Form',
  });
});

exports.garmentsPage = catchAsync(async (req, res) => {
  const products = await Product.find(req.query);

  res.status(200).render('garments', {
    title: 'All Products',
    products,
  });
});

exports.transfersPage = catchAsync(async (req, res) => {
  res.status(200).render('transfers', {
    title: 'Printed Transfers',
  });
});

exports.printPage = catchAsync(async (req, res) => {
  res.status(200).render('newprint', {
    title: 'Full Service Printing',
  });
});

exports.graphicPage = catchAsync(async (req, res) => {
  res.status(200).render('graphic', {
    title: 'Graphic Design',
  });
});

exports.transfersheetPage = catchAsync(async (req, res) => {
  res.status(200).render('transfersheet', {
    title: 'Transfer Sheet Layup',
  });
});

exports.vectorPage = catchAsync(async (req, res) => {
  res.status(200).render('vector', {
    title: 'Vector Conversion',
  });
});

exports.getLoginForm = (req, res) => {
  res.status(200).render('login', {
    title: 'Log in to your Account',
  });
};

exports.getSignupForm = catchAsync(async (req, res) => {
  const max = await User.find();

  res.status(200).render('createaccount', {
    title: 'Create your new Account',
    max,
  });
});

exports.forgotPasswordForm = (req, res) => {
  res.status(200).render('forgotpassword', {
    title: 'Forgot password?',
  });
};

exports.resetPasswordForm = (req, res) => {
  if (!res.locals.user) {
    const { token } = req.query;
    res.status(200).render('resetpassword', {
      title: 'Reset your password',
      token,
    });
  } else {
    res.redirect('/');
  }
};

exports.allOrders = catchAsync(async (req, res) => {
  const orders = await Order.find().sort({
    dateReq: 1,
  });
  res.status(200).render('allorders', {
    title: 'All Orders',
    orders,
  });
});

exports.allMessages = catchAsync(async (req, res) => {
  const messages = await Message.find().sort({
    date: -1,
    time: -1,
  });
  res.status(200).render('messages', {
    title: 'All Messages',
    messages,
  });
});

exports.orderPage = catchAsync(async (req, res) => {
  console.log(req.query.order);
  const orderNum = req.query.order;
  const order = await Order.findOne({ _id: orderNum });
  res.status(200).render('orderpage', {
    title: 'Order Page',
    order,
  });
});

exports.editorderPage = catchAsync(async (req, res) => {
  console.log(req.query.order);
  const orderNum = req.query.order;
  const order = await Order.findOne({ _id: orderNum });
  res.status(200).render('editorderpage', {
    title: 'Order Detail Page',
    order,
  });
});

exports.allUsers = catchAsync(async (req, res) => {
  const users = await User.find({ role: 'user' });
  res.status(200).render('allusers', {
    title: 'User Accounts',
    users,
  });
});

exports.allRegistered = catchAsync(async (req, res) => {
  const emails = await Registration.find();
  res.status(200).render('registered', {
    title: 'Registered Emails',
    emails,
  });
});

exports.quoteRequests = catchAsync(async (req, res) => {
  const requests = await Request.find();
  res.status(200).render('quoterequests', {
    title: 'Quote Requests',
    requests,
  });
});

exports.placeOrder = catchAsync(async (req, res) => {
  res.status(200).render('orderpage', {
    title: 'Place An Order',
  });
});

exports.orderHistory = catchAsync(async (req, res) => {
  const orders = await Order.find({ customerID: req.user.id }).sort({
    orderDate: -1,
  });
  res.status(200).render('history', {
    title: 'Order History',
    orders,
  });
});

exports.completedOrders = catchAsync(async (req, res) => {
  const orders = await Order.find({ status: 'Complete' }).sort({
    orderDate: -1,
  });
  res.status(200).render('completedOrders', {
    title: 'Completed Orders',
    orders,
  });
});
exports.openOrders = catchAsync(async (req, res) => {
  const orders = await Order.find({ status: 'Order Placed' }).sort({
    orderDate: -1,
  });
  res.status(200).render('openOrders', {
    title: 'Open Orders',
    orders,
  });
});
