const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({
    path: path.join(__dirname, ".env")
});

const Admin = require("./models/admin");

mongoose.connect(process.env.MONGO_URI)
.then(async () => {

    const admin = await Admin.findOne({ username: "Legit" });

    console.log(admin);

    process.exit();

});