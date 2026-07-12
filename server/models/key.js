const mongoose = require("mongoose");

const keySchema = new mongoose.Schema({

    key:{
        type:String,
        unique:true
    },

    duration:{
    type:String,
    required:true
},

    used:{
        type:Boolean,
        default:false
    },

    deviceId:{
        type:String,
        default:""
    },

    createdAt:{
        type:Date,
        default:Date.now
    },

    expiresAt:{
        type:Date
    }

});

module.exports = mongoose.model("Key", keySchema);
