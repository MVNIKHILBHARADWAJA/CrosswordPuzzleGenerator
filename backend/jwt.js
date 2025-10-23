import jwt from "jsonwebtoken"

 const secret=`${process.env.COOKIE_PARSER_KEY}`;

 export const tokenGeneration=(userPayload)=>{

    return jwt.sign(userPayload,secret);
 }

 export const verifyToken=(token)=>{

    return jwt.verify(token,secret);
 }