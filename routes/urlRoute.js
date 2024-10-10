const express = require('express');
const urlController = require('../controlors/urlControllors');
const authMiddleware = require('../middleware/authMiddlewars');

const router = express.Router();

router.post('/shorten', authMiddleware.protect, urlController.createShortURL);

router.get('/:shortURL', urlController.redirectToOriginalURL);
router.get('/', authMiddleware.protect, urlController.getURLs);

router.post('/getUrlStatus', authMiddleware.protect, urlController.getURLStats);

module.exports = router;


