import React from 'react';
import './Auth.css';
import { Link, useNavigate } from 'react-router-dom';
import clientServer from '../config';
import { useState } from 'react';
import { useUser } from '../context/Context';

const Register = () => {
  
   let {person,setPerson}=useUser();

const [user, setuser] = useState({
    "email":"",
    "password":"",
    "username":"",
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
      const res=await clientServer.post("/signUp",user);
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
      <h2>Register</h2>
      <form onSubmit={submitHandler}>
        <input type="text" name="username" onChange={handleChange} placeholder="username" required />
       <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Register</button>
      </form>
      <div className="auth-links">
        <span>Already have an account? <Link to="/login">Login</Link></span>
      </div>
    </div>
  );
};

export default Register;
