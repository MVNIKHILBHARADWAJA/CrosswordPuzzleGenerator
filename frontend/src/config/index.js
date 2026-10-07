import axios from "axios";

 const clientServer=axios.create({
    baseURL:"https://crosswordpuzzlegenerator.onrender.com",
    withCredentials:true,
 });

 export default clientServer;
