const express = require('express');
const { checkAuth } = require('../middleware/authMiddleware');
const chatController = require('../controller/chatController');
const router = express.Router();

router.route('/').post(checkAuth, chatController.accessChat);

router.route('/').get(checkAuth, chatController.getChats);

router.route('/group').post(checkAuth, chatController.createGroupChat);

 router.put('/rename', checkAuth, chatController.renameGroup);

 router.put('/groupremove', checkAuth, chatController.removeFromGroup);

 router.put('/groupadd', checkAuth, chatController.groupadd);



module.exports = router;