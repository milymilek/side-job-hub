import React from 'react'
import { Link } from 'react-router-dom'

import NavigationBar from "../NavigationBar"
import Avatar from "../../assets/avatars/pudzian_avatar.jpg"

import "./HeaderBar.css"


export default function HeaderBar() {
    return (
        <div className="header-home">
                <img className='logo-home' src={Logo}/>
                <p>Hi [nickname]</p>
                <img className='logout' src={Logout}/>
        </div>
    );
}