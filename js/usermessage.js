const { error } = require("jquery");
const mongoose=require("mongoose");
const validator = require("validator");

const userSchema = mongoose.Schema({
    name:{
        type:String,
        require:true,
        minLength:3
    },
    email:{
        type:String,
        require:true,
        validate(value){
            if(validator.isEmail(value)){
                throw new Error("invalid email id")
            }
        }
    },
    phone:{
        type:Number,
        min:10

    },
    message:{
        type:String,
        require:true,
        minLength:3
    }

})

// collection
const User = mongoose.model("Users",userSchema);
module.exports= User;