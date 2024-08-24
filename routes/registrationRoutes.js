const express = require('express');
const authController = require('../controllers/authController');
const viewsController = require('../controllers/viewsController');
const registrationController = require('../controllers/emailController');

const router = express.Router();

router.use(viewsController.alerts);

router.get('/', registrationController.getAllEmails);
router.get('/:id', registrationController.getEmail);
router.post('/', registrationController.createEmail);
router.patch('/:id', registrationController.updateEmail);
router.delete('/:id', registrationController.deleteEmail);

module.exports = router;
