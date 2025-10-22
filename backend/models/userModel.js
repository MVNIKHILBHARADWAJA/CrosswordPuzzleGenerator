 import mongoose from "mongoose";
 const userSchema=mongoose.Schema({
    email:
    {
        type:String,
        required:true,
        trim:true,
        unique:true,
    },
    password:{
        type:String,
        required:true        
    },
    username:{
        type:String,
        required:true,
        trim:true
    }
 });

  const User=mongoose.model("User",userSchema);


export default User;

