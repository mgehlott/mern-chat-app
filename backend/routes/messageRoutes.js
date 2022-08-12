const express = require('express');
const { checkAuth } = require('../middleware/authMiddleware');
const messageController = require('../controller/messageController');

const router = express.Router();

router.post('/', checkAuth, messageController.sendMessage);
router.get('/:chatId', checkAuth, messageController.getAllMessage);

module.exports = router;