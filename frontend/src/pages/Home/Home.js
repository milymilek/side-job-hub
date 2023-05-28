import React from 'react'
import { useState, useEffect } from "react";
import {Link, Navigate} from 'react-router-dom'
import axios from "axios";

import { MDBListGroup, MDBListGroupItem, MDBBtn } from 'mdb-react-ui-kit';

import Logo from "../../assets/icons/logo.svg";
import Pin from "../../assets/icons/pin.svg";
import Book from "../../assets/icons/book.svg";
import Search from "../../assets/icons/search.svg"
import Logout from "../../assets/icons/logout.svg"

import NavBar from "../../components/NavBar/NavBar.js"
import HeaderBar from "../../components/HeaderBar/HeaderBar.js"
import SliderList from "../../components/SliderList/SliderList.js";

import "./Home.css"

export default function Home() {
    const [announcements, setAnnouncements] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [first_name, setName] = useState('');
    const [navigate, setNavigate] = useState(false);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await fetch(`http://localhost:8000/announcements/recommend/`);
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
                    const {data} = await axios.get("authentication/user/", {withCredentials: true});
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
            <HeaderBar />

            <div className="search">
                <img src={Search}/>
                <input placeholder="Search for somebody!" onChange={() => {}} />
            </div>

            <div className="create-button">
                <Link to="/add">
                    <MDBBtn rounded className='mx-2' color='secondary'>
                        &nbsp;&nbsp;Create Announcement!&nbsp;&nbsp;
                    </MDBBtn>
                </Link>
            </div>

            {/* <MDBBtn rounded className='create-button' color='secondary'>
                <Link to="/add">Create Announcement</Link>
            </MDBBtn> */}

            <div className="recommendations">
                <div className="recommendations-header">
                    <img src={Book} />
                    <h7>May interest you</h7>
                </div>

                {announcements ? (
                    //<SliderList items={announcements}/>
                    <MDBListGroup style={{ marginLeft: '1.5em', width: '57em'}} light>
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

            <div className="map-widget">
                <div className="offers-near">
                    <div className="offers-near-header">
                        <img src={Pin} />
                        <h7>Offers near you</h7>
                    </div>
                    
                    <div className="map"></div>
                </div>
            </div>

            <NavBar />
        </div>
        
    )
}
