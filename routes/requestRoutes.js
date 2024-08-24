const express = require('express');
const authController = require('../controllers/authController');
const viewsController = require('../controllers/viewsController');
const requestController = require('../controllers/requestController');

const router = express.Router();

router.use(viewsController.alerts);

router.get('/', requestController.getAllRequests);
router.get('/:id', requestController.getRequest);
router.post('/', requestController.createRequest);
router.patch('/:id', requestController.updateRequest);
router.delete('/:id', requestController.deleteRequest);

module.exports = router;
