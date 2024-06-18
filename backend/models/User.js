const mongoose = require("mongoose");

const userShema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    confirmPassword: { type: String },
    resetPasswordToken: { type: String },
    resetPasswordTokenExpire: { type: Date }
});

module.exports = mongoose.model("user", userShema);