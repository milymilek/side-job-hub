import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import {Login} from './components/Login'
import {Register} from './components/Register'
import {ForgotPassword} from './components/ForgotPassword'

import Home from './components/pages/home'
import Chat from './components/pages/chat'
import Add from './components/pages/add'

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