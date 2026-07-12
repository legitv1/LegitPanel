const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

const authRoutes = require("./routes/auth");
const resellerRoutes = require("./routes/reseller");
const keyRoutes = require("./routes/key");
const verifyRoutes = require("./routes/verify");

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// API Routes
app.use("/api", authRoutes);
app.use("/api/reseller", resellerRoutes);
app.use("/api/key", keyRoutes);
app.use("/api/verify", verifyRoutes);

// Home Route
app.get("/", (req, res) => {

    res.send("🚀 Legit Premium Panel API is Running!");

});

// Start Server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

    console.log(`🚀 Server running on port ${PORT}`);

});