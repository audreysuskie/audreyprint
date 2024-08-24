const express = require('express');
const authController = require('../controllers/authController');
const viewsController = require('../controllers/viewsController');
const messageController = require('../controllers/messageController');

const router = express.Router();

router.use(viewsController.alerts);

router.get('/', messageController.getAllMessages);
router.get('/:id', messageController.getMessage);
router.post('/', messageController.createMessage);
router.patch('/:id', messageController.updateMessage);
router.delete('/:id', messageController.deleteMessage);

module.exports = router;
