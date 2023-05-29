import React, {useState, useEffect} from 'react';
import { Link, Navigate } from 'react-router-dom'

import axios from "axios";

import Logo from "../../assets/icons/logo.svg";
import Logout from "../../assets/icons/logout.svg"

import "./HeaderBar.css"



export default function HeaderBar() {
    const [name, setName] = useState("");
    const [avatar, setAvatar] = useState("");
    const [navigate, setNavigate] = useState(false);

    useEffect(() => {
        (
            async () => {
                const {data} = await axios.get("authentication/user/", {withCredentials: true});
                setName(data.first_name);
                setAvatar(data.avatar);
            }
        )();
    }, []);

    const logout = async () => {
        await axios.post("authentication/logout/", {}, {withCredentials: true})
        setNavigate(true);
    }

    if (navigate) {
        return <Navigate to="/login"/>;
    }

    return (
        <div className="header-home">
            <div className="header-logo-name">
                <img className='logo-home' src={Logo}/>
                <h3>Hi {name}</h3>
            </div>
            <img className='logout' src={Logout} onClick={logout}/>
        </div>
    );
}