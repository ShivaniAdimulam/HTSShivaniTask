const { ObjectId } = require('mongodb');
let mongoose=require('mongoose')
const userSchema=new mongoose.Schema({
    first_name:{
        type:String,
        required:true
    },
    last_name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    loginStatus:{
        type:Boolean
    },
    token:{
        type:String
    }
},{timestamps:true})

const user=mongoose.model("user",userSchema)

module.exports=user;