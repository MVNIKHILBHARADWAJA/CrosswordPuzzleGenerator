import React from 'react'
import { useState } from 'react'
import clientServer from '../config';
import { useNavigate } from 'react-router-dom';
import "./Auth.css"

const ResetPassword = () => {
    const navigate=useNavigate();
    const [password, setpassword] = useState("");
    const [confirmPassword, setconfirmPassword] = useState("")

    let changeHandler=(e)=>{
        let {name,value}=e.target;
        console.log(name);


        name==="password"? setpassword(value):name=="confirmPassword"?setconfirmPassword(value):"";
        
    }

    let submitHandler=async (e)=>{
        const params=new URLSearchParams(location.search);
        const resetToken=params.get("token");
        e.preventDefault();
        if(password===confirmPassword)
    {
        try{
            let res=await clientServer.post("/reset-password",{password:password,resetToken});
            alert(res.data.message);
            navigate("/login");
                
            

        }
        catch(err)
        {
            if (err.response) {
    console.error("Backend Error:", err.response.data);         
    console.error("Status Code:", err.response.status);         
  }  else {
    console.error("Axios Error:", err.message);
  }  

        }
        }
        else{
            alert("Password and Confirm Password Are Not Same")
        }
    }
   

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Reset Password</h2>

        <form onSubmit={submitHandler}>
          <input
            type="password"
            name="password"
            placeholder="Enter New Password"
            value={password}
            onChange={changeHandler}
            className="auth-input"
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={changeHandler}
            className="auth-input"
          />

          <button type="submit" className="auth-button">
            Reset Password
          </button>
        </form>
      </div>
    </div>
  )
}

export default ResetPassword;