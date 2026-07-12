const express = require("express");
const key = require("../models/key");

const router = express.Router();

function generatekey(length = 16) {

    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let key = "";

    for (let i = 0; i < length; i++) {
        key += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return key.match(/.{1,4}/g).join("-");
}

router.post("/generate", async (req, res) => {

    try {

        const { duration } = req.body;

        const key = generatekey();

        await key.create({
            key,
            duration
        });

        res.json({
            success: true,
            key
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

});

module.exports = router;