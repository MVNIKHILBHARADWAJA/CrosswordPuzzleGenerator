import { createContext, useContext, useState } from "react";
import React from 'react'

    const UserContext=createContext();

export const Context = ({children}) => {
    const [person, setPerson] = useState(null);
  return (
   
   <UserContext.Provider value={{person,setPerson}}>
    {children}
   </UserContext.Provider>

  
  )
}
 
export const useUser=()=>{
  return useContext(UserContext);
}

