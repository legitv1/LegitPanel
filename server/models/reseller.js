const mongoose = require("mongoose");
const resellerSchema = new mongoose.Schema({

    username:{
        type:String,
        required:true,
        unique:true
    },

    password:{
        type:String,
        required:true
    },

    coins:{
        type:Number,
        default:0
    },

    id:{
        type:String,
        unique:true
    }

});

module.exports = mongoose.model("reseller", resellerSchema);