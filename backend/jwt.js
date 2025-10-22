import jwt from "jsonwebtoken"

 const secret="1234";

 export const tokenGeneration=(userPayload)=>{

    return jwt.sign(userPayload,secret);
 }

 export const verifyToken=(token)=>{

    return jwt.verify(token,secret);
 }