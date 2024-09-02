const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const User = require('../models/User');
const sendemail = require('../utilities/sendEmail');


exports.registerUser = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    try {
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        const activationToken = jwt.sign(
            { id: newUser._id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        const activationURL = `${process.env.CLIENT_URL}/activate/${activationToken}`;

        await sendemail({
            to: newUser.email,  // Check if this email is valid
            subject: 'Account Activation',
            text: `Please activate your account by clicking the following link: ${activationURL}`,
        });

        res.status(201).json({ message: 'User registered. Check your email to activate your account.' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};



exports.activateAccount = async (req, res) => {
    const { token } = req.params;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(404).json({ message: 'Invalid token' });
        }

        user.isActive = true;
        await user.save();

        res.status(200).json({ message: 'Account activated. You can now log in.' });
    } catch (err) {
        res.status(400).json({ message: 'Invalid token' });
    }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        if (!user.isActive) {
            return res.status(400).json({ message: 'Account not activated' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        const resetURL = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
        await sendemail({
            to: user.email,
            subject: 'Password Reset',
            text: `Please reset your password by clicking the following link: ${resetURL}`,
        });

        res.json({ message: 'Password reset email sent', token: resetToken});
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};


exports.resetPassword = async (req, res) => {

    const { token, password } = req.body;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(404).json({ message: 'Invalid token' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        user.password = hashedPassword;
        await user.save();

        res.json({ message: 'Password reset successful' });
    } catch (err) {
        res.status(400).json({ message: 'Failed to reset password' });
    }
};
