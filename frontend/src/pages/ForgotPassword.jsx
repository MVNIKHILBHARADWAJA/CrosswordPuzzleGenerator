import React from 'react'
import { useState } from 'react'
import './Auth.css';
import clientServer from '../config';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
    const [email, setEmail] = useState("");

    let EmailHandler = async (e)=>{
 
           
        setEmail(e.target.value);

    }

  let submitHandler= async (e)=>{
    e.preventDefault();
    try{
        const res=await clientServer.post("/forgot-password",{email});
        alert(res.data.message);
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
      <h2>Forgot Password</h2>

      <form onSubmit={submitHandler}>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={email}
          onChange={EmailHandler}
          required
        />
        <button type="submit">Send Reset Link</button>
      </form>

      <div className="auth-links">
        <span>
          Remembered your password? <Link to="/login">Login</Link>
        </span>
      </div>
    </div>
  )
}

export default ForgotPassword;