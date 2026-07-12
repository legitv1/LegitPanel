const express = require("express");
const Admin = require("../models/Admin");

const router = express.Router();

router.post("/login", async (req,res)=>{

    const {username,password} = req.body;

    try{

        const Admin = await Admin.findOne({username,password});

        if(Admin){

            return res.json({

                success:true,
                role:"Admin"

            });

        }

        return res.status(401).json({

            success:false,
            message:"Invalid username or password"

        });

    }catch(err){

        return res.status(500).json({

            success:false,
            message:"Server Error"

        });

    }

});

module.exports = router;