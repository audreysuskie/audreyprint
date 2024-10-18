const express = require('express');
const authController = require('../controllers/authController');
const viewsController = require('../controllers/viewsController');
const messageController = require('../controllers/messageController');

const router = express.Router();

router.use(authController.isLoggedIn);

router.use(viewsController.alerts);

router.get('/emailedit', viewsController.checkEmail);

router.get('/dtf', viewsController.dtfPage);

router.get('/contact', viewsController.contactPage);

router.get('/messages', viewsController.allMessages);

router.get('/dtfcare', viewsController.applicationPage);

router.get('/forgotpassword', viewsController.forgotPasswordForm);

router.get('/printwear', viewsController.filterPage);

router.get('/filter', viewsController.productsPage);

router.get('/tanks', viewsController.tanktopPage);

router.get('/productpage', viewsController.productPage);

router.get('/', viewsController.homePage);

router.get('/temp', viewsController.tempPage);

router.get('/thankyou', viewsController.thankyouPage);

router.get('/print', viewsController.printPage);

router.get('/graphic', viewsController.graphicPage);

router.get('/vector', viewsController.vectorPage);

router.get('/digitizing', viewsController.digitizingPage);

router.get('/artservice', viewsController.artservicePage);

router.get('/embroidery', viewsController.embroideryPage);

router.get('/login', viewsController.getLoginForm);

router.get('/signup', viewsController.getSignupForm);

router.get('/logout', authController.logout);

router.get(
  '/account',
  authController.isLoggedIn,
  authController.protect,
  authController.restrictTo('admin', 'user'),
  viewsController.profilePage
);

router.get(
  '/resetPassword',
  authController.isLoggedIn,
  viewsController.resetPasswordForm
);

router.get(
  '/allorders',
  authController.isLoggedIn,
  authController.protect,
  authController.restrictTo('admin'),
  viewsController.allOrders
);

router.get(
  '/allmessages',
  authController.isLoggedIn,
  authController.protect,
  authController.restrictTo('admin'),
  viewsController.allMessages
);

router.get(
  '/allusers',
  authController.isLoggedIn,
  authController.protect,
  authController.restrictTo('admin'),
  viewsController.allUsers
);

router.get(
  '/useremails',
  authController.isLoggedIn,
  authController.protect,
  authController.restrictTo('admin'),
  viewsController.allRegistered
);

router.get(
  '/quotereq',
  authController.isLoggedIn,
  authController.protect,
  authController.restrictTo('admin'),
  viewsController.quoteRequests
);

router.get(
  '/order',
  authController.isLoggedIn,
  authController.protect,
  viewsController.placeOrder
);

router.get(
  '/orderhistory',
  authController.isLoggedIn,
  authController.protect,
  viewsController.orderHistory
);

router.get(
  '/completed',
  authController.isLoggedIn,
  authController.protect,
  viewsController.completedOrders
);

router.get(
  '/openorders',
  authController.isLoggedIn,
  authController.protect,
  viewsController.openOrders
);

router.get('/orders/:id', viewsController.printOrderPage);

router.get('/orderpage', authController.isLoggedIn, viewsController.orderPage);

router.get(
  '/editorderpage',
  authController.isLoggedIn,
  authController.protect,
  authController.restrictTo('admin'),
  viewsController.editorderPage
);

module.exports = router;
