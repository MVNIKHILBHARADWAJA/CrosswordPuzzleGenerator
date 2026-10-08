import jwt from "jsonwebtoken"
import { tokenGeneration, verifyToken } from "../jwt.js";
import User from "../models/userModel.js";
import bcrypt from "bcrypt"
import nodemailer from "nodemailer";
export const signUp= async (req,res)=>{
 
    try
    { 
      let {email,password,username}=req.body;

   let existedUser=await User.findOne({email:email});

   if(existedUser)
   {
     return res.status(404).json({message:"User already exists with this mail"});
   }

       let hashedPassword=await bcrypt.hash(password,10);

   const newUser=new User({
       email:email,
       password:hashedPassword,
       username:username,
   });

  await newUser.save();

  const token=tokenGeneration({id:newUser._id});

     res.cookie("token",token,{signed:true,
        httpOnly:true,
        secure:true
     })
   return res.status(200).json({message:`user with ${newUser.username} username  created succesfully`});  
      }
    catch(err)
    {
        return res.status(500).json({message:err.message});
    }

}

export const signIn=async (req,res)=>{
  try{
    const {email,password}=req.body;
   const existedUser=await User.findOne({email:email});
    if(!existedUser)
    {
       return res.status(404).json({message:"User with this mail doesnt exist"});
           }
    if(!await bcrypt.compare(password,existedUser.password))
    {
        return res.status(401).json({message:"Password was incorrect"});
    }
   const token=tokenGeneration({id:existedUser._id});
  res.cookie("token",token,{signed:true,httpOnly:true,secure:true});
  res.status(200).json({message:`${existedUser.username}  loggedIn succesfully`});
  }
catch(err)
{
    return res.status(500).json({message:err.message});
}
}

export const logOut=async (req,res)=>{
      try{
   res.clearCookie("token",{signed:true,httpOnly:true,secure:true});
   
   res.status(200).json({message:`Logged out Succesfully`})
}
catch(err)
{
    return res.status(500).json({message:err.message});
}
}

export const getUser=async (req,res)=>{

   try{
   const token=req.signedCookies.token;
   if(token)
   { 
    const userId=verifyToken(token);
    
   const user=await User.findById(userId.id);
   

   if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
     res.status(200).json({data:user.username});
    
   }
   else
   {
      res.status(401).json({message:"you are not loggedin"});

   }   
   
}
catch(err)
{
    return res.status(500).json({message:err.message});
}
}

export const forgotPassword=async (req,res)=>{
   

    const {email}=req.body;
      
    if(!email)
    { console.log(email);
        return res.status(400).json({message:"Email invalid"});
    }
    
    let existedUser=await User.findOne({email:email});
    if(!existedUser)
    {
        return res.status(404).json({message:"User not found with this email"})
    }
    
    const resetToken=jwt.sign({email:email,purpose:"reset password"},process.env.RESET_SECRET,{ expiresIn: "10m" });

    

    





    const transporter=nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:process.env.SENDER_Email,
            pass:process.env.APP_PASSWORD_FOR_MAILS

        }
    })


    const mailOptions={
        from:process.env.SENDER_Email,
        to:email,
        subject:"Reset Password",
        text: `Click on the link to reset password https://crossword-puzzle-generator.vercel.app/reset-password?token=${resetToken}`
    }
 try{
    
    const info= await transporter.sendMail(mailOptions);
    
    return res.status(200).json({message:  `A Link sent to your mail ${email} Succesfully`});
    





 }
 catch(err)
 {
   return res.status(500).json({message:err.message});
 }



}

export const resetPassword=async (req,res)=>{
  

    try
    {
   const {password,resetToken}=req.body;
    
   if(!password||!resetToken)
   {
     return res.status(400).json({message:"Details Are Insufficient"})
   }

   let hashedPassword=await bcrypt.hash(password,10);
   
      const details= jwt.verify(resetToken,process.env.RESET_SECRET);

      if (details.purpose !== "reset password") {
  return res.status(400).json({ message: "Invalid reset token" });
}
    
   const email=details.email;

   const existedUser=await User.findOne({email:email});
   if(!existedUser)
   {
      return res.status(404).json({message:"User Doesnt Exist"});
   }

   const UpdatedUser=await User.findOneAndUpdate({email:email},{password:hashedPassword});
 console.log(UpdatedUser);

 return res.status(200).json({message:"Password Updated Succesfully"});

   

    }
    catch(err)
    {
        if (err.name === "TokenExpiredError") {
    return res.status(400).json({ message: "Reset link expired" });
  }
       return res.status(500).json({message:err.message});
    }




}

