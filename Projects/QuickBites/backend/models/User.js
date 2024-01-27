const mongoose = require('mongoose')

//destructuring in js
const {Schema} = mongoose;

const UserSchema= new Schema({
    name:{
        type : String,
        required:true
    },
    location:{
        type : String,
        required:true
    },
    email:{
        type : String,
        required:true
    },
    password:{
        type : String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model('user', UserSchema)
