const express = require("express");
const reseller = require("../models/reseller");

const router = express.Router();

router.post("/add", async(req,res)=>{

    try{

        const {username,password,coins,id} = req.body;

        const exists = await reseller.findOne({username});

        if(exists){

            return res.json({

                success:false,
                message:"Username already exists"

            });

        }

        await reseller.create({

            username,
            password,
            coins,
            id

        });

        res.json({

            success:true

        });

    }catch(err){

        res.status(500).json({

            success:false,
            message:err.message

        });

    }

});

module.exports = router;