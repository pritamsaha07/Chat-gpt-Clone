const express = require('express');
const router = express.Router();
const { registerController, loginController, logoutController } = require('./authController');

router.post('/register', registerController);
router.post('/login', loginController);
router.post('/logout', logoutController);

module.exports = router;
