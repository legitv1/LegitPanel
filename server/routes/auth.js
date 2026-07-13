const express = require("express");
const Admin = require("../models/admin");

const router = express.Router();

router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        const admin = await Admin.findOne({
            username,
            password
        });

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

    } 
    catch (err) {
    console.error(err);

    return res.status(500).json({
        success: false,
        message: err.message
    });
}
});

module.exports = router;