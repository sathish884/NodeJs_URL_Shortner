const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoute');
const urlRoutes = require('./routes/urlRoute');

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(bodyparser.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/urls', urlRoutes);

const PORT = process.env.PORT;

app.get("/", (req, res) => {
    res.json({ message: "Password Reset flow Deployed Successfully" });
});

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("MongoDB was connected");
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    })
}).catch(error => {
    console.log("Connection failed", error.message);
});
