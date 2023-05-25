import React, {useState} from 'react'
import {Link, Navigate} from 'react-router-dom'

import Logo from "../../assets/icons/logo.svg";
import Logout from "../../assets/icons/logout.svg"

import NavigationBar from "../NavigationBar"

import "./home.css"
import axios from "axios";
import Search from "../../assets/icons/search.svg";


export default function Add() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [navigate, setNavigate] = useState(false);

    const submit = async e => {
        // e.preventDefault()
        // const {data} = await fetch(`http://localhost:8000/create_announcement/`);
        setNavigate(true);
    }

    if (navigate) {
        return <Navigate to="/home"/>;
    }

    return (
        <div className="screen-2">
            <div className="header-home">
                <img className='logo-home' src={Logo}/>
                <p>Announce something!</p>
                <img className='logout' src={Logout}/>
            </div>

            <form onSubmit={submit}>
                <div className="form-field">
                    <div classname="field-desc">
                        <h8>What is your need?</h8>
                    </div>
                    <div className="field-text">
                        <input/>
                    </div>
                </div>

                <div className="form-field">
                    <div className="field-desc">
                        <h8>Describe it</h8>
                        <h8>500 signs</h8>
                    </div>
                    <div className="field-text">
                        <input/>
                    </div>
                </div>

                <div className="form-field">
                    <div className="field-desc">
                        <h8>Upload attachments if needed</h8>
                    </div>
                    <div className="field-text">
                        <input className='picture-load' type="file" name="file"/>
                    </div>
                </div>

                <div className="form-field">
                    <div className="field-desc">
                        <h8>Category</h8>
                    </div>
                    <div className="field-text">
                        <input className='picture-load' type="file" name="file"/>
                    </div>
                </div>


                <input className="login" type="submit" value="Submit"/>

            </form>


            <NavigationBar />
        </div>
    )
}
