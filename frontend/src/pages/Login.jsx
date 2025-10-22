import React, { use } from 'react'
import "./Auth.css";
import {Link, useNavigate} from 'react-router-dom';
import { useState } from 'react';
import clientServer from '../config';
import { useUser } from '../context/Context';
const Login = () => {
 let {person,setPerson}=useUser();
  const [user, setuser] = useState({
    "email":"",
    "password":""
  });
  const navigate=useNavigate();
  const handleChange= async (e)=>{
     const { name, value } = e.target;
    setuser({
      ...user,
      [name]:value
    });
  }
  const submitHandler=async (e)=>{
    e.preventDefault();
   try{
      const res=await clientServer.post("/signIn",user);
      alert(res.data.message);
       
        setPerson(user);
      navigate("/crossword");
    
   }
   catch(err)
   {   if (err.response) {
    console.error("Backend Error:", err.response.data);         
    console.error("Status Code:", err.response.status);         
  }  else {
    console.error("Axios Error:", err.message);
  }  

   }
  }
  
  return (
   <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={submitHandler}>
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit" >Login</button>
      </form>
      <div className="auth-links">       
          <span>Don't you have an account?<Link to="/register">Register</Link></span>
        </div>
      </div>
  )
}

export default Login;