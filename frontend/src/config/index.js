import axios from "axios";

 const clientServer=axios.create({
    baseURL:"http://localhost:8080",
    withCredentials:true,
 });

 export default clientServer;
