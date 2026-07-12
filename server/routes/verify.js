const express = require("express");
const Key = require("../models/Key");

const router = express.Router();

router.post("/", async (req, res) => {

    try{

        const { key, deviceId } = req.body;

        const license = await Key.findOne({ key });

        if(!license){

            return res.json({

                success:false,
                message:"Invalid Key"

            });

        }

        if(license.used && license.deviceId !== deviceId){

            return res.json({

                success:false,
                message:"Key already used"

            });

        }

        if(!license.used){

            license.used = true;
            license.deviceId = deviceId;

            const expire = new Date();

switch(license.duration){

    case "1 Hour":
        expire.setHours(expire.getHours() + 1);
        break;

    case "6 Hours":
        expire.setHours(expire.getHours() + 6);
        break;

    case "12 Hours":
        expire.setHours(expire.getHours() + 12);
        break;

    case "1 Day":
        expire.setDate(expire.getDate() + 1);
        break;

    case "3 Days":
        expire.setDate(expire.getDate() + 3);
        break;

    case "7 Days":
        expire.setDate(expire.getDate() + 7);
        break;

    case "15 Days":
        expire.setDate(expire.getDate() + 15);
        break;

    case "30 Days":
        expire.setDate(expire.getDate() + 30);
        break;

}

            license.expiresAt = expire;

            await license.save();

        }

        if(new Date() > license.expiresAt){

            return res.json({

                success:false,
                message:"Key Expired"

            });

        }

        res.json({

            success:true,
            expires:license.expiresAt

        });

    }catch(err){

        res.status(500).json({

            success:false,
            message:err.message

        });

    }

});

module.exports = router;