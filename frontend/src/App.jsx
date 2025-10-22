import React from 'react'

import Crossword from './pages/Crossword';
import Navbar from './components/Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import SignUpForm from './pages/SignUpform';
import Login from './pages/Login';
import ForwardingRoute from './components/ForwardingRoute';

const App = () => {
   
  return (
    <>
    <Navbar />
    <main>
   <Routes>
    <Route path="/" element={<Home />} />
     <Route path="/crossword"   element={<ForwardingRoute><Crossword/></ForwardingRoute>}   />
     <Route path="/register" element={<SignUpForm/>}/>
       <Route path="/login" element={<Login />} /> 
    </Routes>
   </main>
   </>
  )
}

export default App