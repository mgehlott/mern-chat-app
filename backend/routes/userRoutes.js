const express = require('express');
const userController = require('../controller/userController');
const { checkAuth} = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/').get(checkAuth,userController.allUser);

module.exports = router;