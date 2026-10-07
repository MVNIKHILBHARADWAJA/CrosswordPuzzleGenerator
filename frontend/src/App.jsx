import React from 'react'

import Crossword from './pages/Crossword';
import Navbar from './components/Navbar';
import { Route, Routes } from 'react-router-dom';
import SignUpForm from './pages/SignUpform';
import Login from './pages/Login';
import ForwardingRoute from './components/ForwardingRoute';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

const App = () => {
   
  return (
    <>
    <Navbar />
    <main>
   <Routes>
     <Route path="/"   element={<ForwardingRoute><Crossword/></ForwardingRoute>}   />
     <Route path="/register" element={<SignUpForm/>}/>
       <Route path="/login" element={<Login />} /> 
       <Route path="/forgot-password" element={<ForgotPassword />} />
       <Route path="/reset-password" element={<ResetPassword/>} />
    </Routes>
   </main>
   </>
  )
}

export default App