const express = require('express');
const authcontroller = require('../controlors/authControllors');

const router = express.Router();

router.post('/register', authcontroller.registerUser);
router.get('/activate/:token', authcontroller.activateAccount);
router.post('/login', authcontroller.loginUser);
router.post('/forgot-password', authcontroller.forgotPassword);
router.post('/reset-password', authcontroller.resetPassword);


module.exports = router;
