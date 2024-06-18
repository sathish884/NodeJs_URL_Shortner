const express = require("express");
const authControllers = require("../controlors/authControllors")

const router = express.Router();

router.route("/userRegister").post(authControllers.registerUser);
router.route("/login").post(authControllers.loginUser);
router.route("/forget-password").post(authControllers.forgetPassword);
router.route("/reset-password").post(authControllers.resetPassword);

module.exports = router;