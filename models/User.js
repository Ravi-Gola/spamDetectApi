const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true,
        min:3,
        max:20
    },
    phone:{
       type:Number,
       require:true,
       min:10

    },
    email:{
        type:String,
        max:50,
    },
    password:{
        type:String,
        require:true,
        min:6
    },
    spam:{
        type:Boolean,
        default:false
    }
},{timestamps:true})

module.exports = mongoose.model("User",UserSchema);