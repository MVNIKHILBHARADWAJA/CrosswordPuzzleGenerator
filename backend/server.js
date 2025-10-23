import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRoutes from "./routes/userroutes.js"
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();



let app=express();

app.use(cookieParser(`${process.env.COOKIE_PARSER_KEY}`));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({   
    origin: "http://localhost:5173", 
   credentials:true
}
));

app.use("/",userRoutes);

 async function main() {
await mongoose.connect(`${process.env.MONGODB_URL}`);
 }

 main()
 .then(()=>{
    console.log("MONGODB connection succcesful");
 })

 .catch((err)=>{
    console.log(err);
 })

app.listen(8080,()=>{
    console.log("server is listening at port 8080");
})



