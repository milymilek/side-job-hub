import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Login from './pages/Login/Login.js'
import Register from './pages/Register/Register.js'
import ForgotPassword from './pages/ForgotPassword/ForgotPassword.js'
import Home from './pages/Home/Home.js'
import Chat from './pages/Chat/Chat.tsx'
import Add from './pages/Add/Add.js'
import Announcement from './pages/Announcement/Announcement.js'
import MyMap from './components/MyMap/MyMap.js'

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
            <Route path="/announcement/:id" element={<Announcement/>} />
            <Route path="/add" element={<Add/>} />
            <Route path="/dm/:conversationName" element={<Chat/>} />
            {/* <Route path="/conversations" element={<Conversations />} /> */}
            <Route path="/map" element={<MyMap/>} />
          </Routes>
        </div>
      </Router>
  );
}