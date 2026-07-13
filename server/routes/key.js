const express = require("express");
const Key = require("../models/key");

const router = express.Router();

function generateKey(length = 16) {

    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let generatedKey = "";

    for (let i = 0; i < length; i++) {
        generatedKey += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return generatedKey.match(/.{1,4}/g).join("-");
}

router.post("/generate", async (req, res) => {

    try {

        const { duration } = req.body;

        const generatedKey = generateKey();

        await Key.create({
            key: generatedKey,
            duration
        });

        res.json({
            success: true,
            key: generatedKey
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

});

module.exports = router;