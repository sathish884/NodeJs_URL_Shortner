const mongoose = require("mongoose");
const shortId = require("shortid");

const urlSortnerShema = new mongoose.Schema(
    {
        longUrl: { type: String, required: true },
        sortUrl: { type: String, required: true, default: shortId.generate },
        clickCount: { type: Number, default: 0 },
    },
    { timestamps }
)

module.exports = mongoose.model("url", urlSortnerShema);