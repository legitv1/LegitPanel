const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const Admin = require("./models/admin");

mongoose.connect(process.env.MONGO_URI)
.then(async()=>{

    const exists = await Admin.findOne({username:"Legit"});

    if(!exists){

        await Admin.create({

            username:"Legit",
            password:"123456"

        });

        console.log("✅ Admin Created");

    }else{

        console.log("ℹ️ Admin Already Exists");

    }

    process.exit();

});