import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import "./Navbar.css";
import clientServer from '../config';
import { useUser } from '../context/Context';





const Navbar = () => {

  

  useEffect( ()=>{

    async function Profile(){
  try{
      const res=await clientServer.post("/profile");     
              setPerson(res.data.data);
      
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
  Profile();
      },[]);








  
  const logout = async ()=>{
   try{
      const res=await clientServer.get("/logout");
      alert(res.data.message);
      
      setPerson(null);
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



  let {person,setPerson}=useUser();
  const navigate=useNavigate();
  return (
     <nav className="navbar">
      <div className="logo" onClick={()=>{navigate("/")}}>CrosswordPuzzle</div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/crossword">Crossword</Link></li>
        {person!=null?<button onClick={logout}>logout</button>:<><li><Link to="/login">Login</Link></li>
        <li><Link to="/register">Register</Link></li></>}
        
         
      </ul>
    </nav>
  )
}

export default Navbar;