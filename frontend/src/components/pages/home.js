import React from 'react'
import { useState, useEffect } from "react";
import {Link, Navigate} from 'react-router-dom'
import axios from "axios";

import { MDBListGroup, MDBListGroupItem } from 'mdb-react-ui-kit';

import Logo from "../../assets/icons/logo.svg";
import Pin from "../../assets/icons/pin.svg";
import Book from "../../assets/icons/book.svg";
import Search from "../../assets/icons/search.svg"
import Logout from "../../assets/icons/logout.svg"

import NavigationBar from "../NavigationBar"
import SliderList from "../SliderList";

import "./home.css"

export default function Home() {
    const [announcements, setAnnouncements] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [first_name, setName] = useState('');
    const [navigate, setNavigate] = useState(false);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await fetch(`http://localhost:8000/recommend/`);
                if (!response.ok) {
                    throw new Error(`This is an HTTP error: The status is ${response.status}`);
                }
                let actualData = await response.json();
                console.log(actualData);
                setAnnouncements(actualData);
                setError(null);
            } catch(err) {
                setError(err.message);
                setAnnouncements(null);
            } finally {
                setLoading(false);
            }
        }
        getData()
    }, [])

    useEffect(() => {
        (
            async () => {
                try {
                    const {data} = await axios.get("user/", {withCredentials: true});
                    setName(data.first_name);
                } catch (e) {
                    setNavigate(true);
                }
            }
        )();
    }, []);

    const logout = async () => {
        await axios.post("logout/", {}, {withCredentials: true})
        setNavigate(true);
    }

    if (navigate) {
        return <Navigate to="/login"/>;
    }

    return (
        <div className="screen-2">
            <div className="header-home">
                <img className='logo-home' src={Logo}/>
                <p>Hi {first_name}</p>
                <img className='logout' src={Logout} onClick={logout}/>
            </div>

            <div className="search">
                <img src={Search}/>
                <input placeholder="Search for somebody!" onChange={() => {}} />
            </div>

            <div className="recommendations">
                <div className="header-home">
                    <img src={Book} />
                    <p>May interest you</p>
                </div>

                {announcements ? (
                    //<SliderList items={announcements}/>
                    <MDBListGroup style={{ minWidth: '22rem' }} light>
                        {announcements.map((item, index) => (
                            <MDBListGroupItem tag='a' href='#' action noBorders active aria-current='true' className='px-3'>
                                {item.title}
                            </MDBListGroupItem>
                        ))}
                    </MDBListGroup>
                ) : (
                    <p>Loading announcements...</p>
                )}
            </div>

            <div className="buttons-action">
                <button><Link to="/add">Announce yourself</Link></button>
                <button><Link to="/add">Request for help</Link></button>
            </div>

            <div className="offers-near">
                <div className="header-home">
                    <img src={Pin} />
                    <p>Offers near you</p>
                </div>
                
                <div className="map"></div>
            </div>
            <NavigationBar />
        </div>
        
    )
}
