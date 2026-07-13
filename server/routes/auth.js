const express = require("express");
const Admin = require("../models/admin");

const router = express.Router();

router.post("/login", async (req, res) => {

    console.log("========== LOGIN REQUEST ==========");
    console.log("BODY:", req.body);

    try {

        const { username, password } = req.body;

        console.log("USERNAME:", username);
        console.log("PASSWORD:", password);
        
        console.log(await Admin.find({}));

        const admin = await Admin.findOne({
            username,
            password
        });

        console.log("FOUND:", admin);

        if (!admin) {
            return res.status(401).json({
                success: false,
                message: "Invalid username or password"
            });
        }

        return res.json({
            success: true,
            role: "Admin"
        });

    } catch (err) {

        console.error("LOGIN ERROR:", err);

        return res.status(500).json({
            success: false,
            message: err.message
        });

    }

});

module.exports = router;