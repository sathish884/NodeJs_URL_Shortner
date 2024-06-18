const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
require("dotenv").config();


// User Registerations
exports.registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            return res.status(404).json({ message: "User already exist" })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();
        res.status(200).json({ message: "User successfully registered" });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// User Login
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const passwordMatch = await User.findOne({ password });
        if (!passwordMatch) {
            return res.status(401).json({ message: "Invalid password" });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });
        res.status(200).json({ token: token });
    } catch (error) {
        res.status(500).json({ errorMsg: error.message })
    }
}

// Forget Password 
exports.forgetPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const randomToken = Math.random().toString(36).slice(-8);
        user.resetPasswordToken = randomToken;
        user.resetPasswordTokenExpire = Date.now() + 360000;
        await user.save();
        const transportar = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "sathish001996m@gmail.com",
                pass: "wikblesusrhqhrlh"
            }
        });
        const msg = {
            from: "sathish001996m@gmail.com",
            to: user.email,
            subject: "Password reset request",
            text: `You are receiving this email because you has requested a password reset for your account. \n\ Please use the following token to reset your password: ${randomToken} \n\n If you didn't request a password reset, please ignore this email.`
        };
        transportar.sendMail(msg, (err, response) => {
            if (err) {
                res.status(404).json({ message: "Somthing went wrong, pls try again !" })
            } else {
                res.status(200).json({ message: "Email sent" })
            }
        });

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// Reset Password
exports.resetPassword = async (req, res) => {
    try {
        const { token, password, confirmPassword } = req.body;
        const userToken = await User.findOne({
            resetPasswordToken: token,
            resetPasswordTokenExpire: { $gt: Date.now() }
        })
        if (!userToken) {
            return res.status(404).json({ message: "Invalid token" })
        }
        if (password !== confirmPassword) {
            res.status(401).json({ message: "Confirm password mismatch" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const hashedConfirmPassword = await bcrypt.hash(confirmPassword, 10);
        const newUser = new User({ password: hashedPassword, confirmPassword: hashedConfirmPassword, resetPasswordToken: null, resetPasswordTokenExpire: null });
        await newUser.save();
        res.status(200).json({ message: "Password reset successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }
}