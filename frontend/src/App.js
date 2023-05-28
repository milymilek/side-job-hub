import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Login from './pages/Login/Login.js'
import Register from './pages/Register/Register.js'
import ForgotPassword from './pages/ForgotPassword/ForgotPassword.js'
import Home from './pages/Home/Home.js'
import Chat from './pages/Chat/Chat.tsx'
import Add from './pages/Add/Add.js'

export default function App() {
  return (
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Login/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/register/" element={<Register/>} />
            <Route path="/forgotpassword" element={<ForgotPassword/>} />
            <Route path="/home" element={<Home/>} />
            <Route path="/add" element={<Add/>} />
            <Route path="/dm" element={<Chat/>} />
          </Routes>
        </div>
      </Router>
  );
}