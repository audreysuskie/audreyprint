const express = require('express');
const authController = require('../controllers/authController');
const viewsController = require('../controllers/viewsController');
const orderController2 = require('../controllers/orderController2');

const router = express.Router();

router.use(authController.isLoggedIn);

router.use(viewsController.alerts);

router.get('/', orderController2.getAllOrders);
router.get('/:id', orderController2.getOrder);

router.post(
  '/uploads',
  orderController2.uploadOrderFiles,
  orderController2.processOrderFiles
);

router.patch('/:id', orderController2.updateOrder);

module.exports = router;
