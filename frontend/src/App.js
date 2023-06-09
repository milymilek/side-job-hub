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
import Search from './pages/Search/Search.js'
import Profile from './pages/Profile/Profile.js'

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
            <Route path="/search/:query" element={<Search/>} />
            <Route path="/dm/:conversationName" element={<Chat/>} />
            <Route path="/dm" element={<Chat/>} />
            <Route path="/map" element={<MyMap/>} />
            <Route path="/profile" element={<Profile/>} />
          </Routes>
        </div>
      </Router>
  );
}