const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            if (!decoded || !decoded.userId) { // Use userId instead of id
                return res.status(401).json({ message: 'Invalid token' });
            }

            req.user = await User.findById(decoded.userId).select('-password'); // Use userId instead of id

            if (!req.user) {
                return res.status(401).json({ message: 'User not found' });
            }

            next();
        } catch (err) {
            console.error('Token Verification Error:', err); // Debug log
            res.status(401).json({ message: 'Invalid token' });
        }
    } else {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};
