const express = require('express');
const authController = require('../controllers/authController');
const viewsController = require('../controllers/viewsController');
const productController = require('../controllers/productController');

const router = express.Router();

router.use(viewsController.alerts);

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProduct);
router.post('/', productController.createProduct);
router.patch('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;
