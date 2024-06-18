const express = require("express");
const UrlController = require("../controlors/urlControllors")

const router = express.Router();

router.route("/url/shortner").post(UrlController.urlGenerate);

router.route("/url/getUrl").get(UrlController.getUrl);

router.route("/url/redirectUrl").get(UrlController.redirectUrl);

module.exports = router;