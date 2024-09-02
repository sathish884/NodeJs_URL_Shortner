const URL = require('../models/urlsort');
const sortID = require('shortid');

exports.createShortURL = async (req, res) => {
    const { originalURL } = req.body;

    try {
        const shortURL = sortID.generate();
        const newURL = new URL({
            originalURL,
            shortURL,
            createdBy: req.user.id,
        });

        await newURL.save();
        res.status(201).json(newURL);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.redirectToOriginalURL = async (req, res) => {
    const { shortURL } = req.params;

    try {
        const url = await URL.findOne({ shortURL });

        if (!url) {
            return res.status(404).json({ message: 'URL not found' });
        }

        url.clickCount += 1;
        await url.save();

        res.redirect(url.originalURL);
    } catch (err) {
        res.status(400).json({ message: 'Failed to redirect' });
    }
};

exports.getURLs = async (req, res) => {
    try {
        const urls = await URL.find({ createdBy: req.user.id });

        res.status(200).json(urls);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getURLStats = async (req, res) => {

    try {
        console.log('User ID from request:', req.user._id); // Debug log

        const urls = await URL.find({ createdBy: req.user._id });

        if (urls.length === 0) {
            return res.status(404).json({ message: 'No URLs found for this user' });
        }

        const totalClicks = urls.reduce((acc, url) => acc + url.clickCount, 0);
        res.json({ totalClicks });
    } catch (err) {
        console.error('Error in getURLStats:', err); // Debug log
        res.status(400).json({ message: 'Failed to fetch URL stats' });
    }
};



