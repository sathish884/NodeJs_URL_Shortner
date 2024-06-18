const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
require("dotenv").config();
const authRoutes = require("./routes/authRoute");
const urlRoutes = require("./routes/urlRoute");

const app = express();
app.use(bodyparser.json());
app.use("/api", authRoutes);
app.use("/api", urlRoutes);

mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log("MongoDB was connected");
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    })
}).catch(error => {
    console.log("Connection failed", error.message);
});

