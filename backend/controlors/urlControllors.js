const Url = require("../models/urlsort");
const ShortId = require("shortid");

// shortner url generate
exports.urlGenerate = async (req, res) => {
    try {
        const { longUrls } = req.body;
        const shortUrl = ShortId.generate();
        const url = new Url({ longUrls, shortUrl });
        await url.save();
        res.status(200).json({ message: "Successfully created" })
    } catch (error) {
        res.status(500).json({ errMsg: error.message })
    }
}

// get url datas
exports.getUrl = async (req, res) => {
    try {
        const urlData = await Url.find({});
        res.status(200).json({ data: urlData });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// redirec sorten url to long urls
exports.redirectUrl = async (req, res) => {
    try {
        const { shortUrl } = req.params;
        const url = await Url.findOne({ shortUrl })
        if (url) {
            return res.redirect(url.longUrl);
        } else {
            return res.status(404).json({ message: "URL not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}