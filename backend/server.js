import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRoutes from "./routes/userroutes.js"
import cookieParser from "cookie-parser";

let app=express();

app.use(cookieParser("1234"))
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({   
    origin: "http://localhost:5173", 
   credentials:true
}
));

app.use("/",userRoutes);

 async function main() {
await mongoose.connect("mongodb+srv://mvnikhilbharadwaja_db_user:XThA8xMwKnMhZjcc@cluster0.dpojvne.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
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



