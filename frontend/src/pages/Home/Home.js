import React, { useState, useEffect } from "react";
import {Link, Navigate} from 'react-router-dom'
import axios from "axios";

import { MDBListGroup, MDBListGroupItem, MDBBtn } from 'mdb-react-ui-kit';

import Logo from "../../assets/icons/logo.svg";
import Pin from "../../assets/icons/pin.svg";
import Book from "../../assets/icons/book.svg";
import SearchIcon from "../../assets/icons/search.svg"
import Logout from "../../assets/icons/logout.svg"

import NavBar from "../../components/NavBar/NavBar.js"
import HeaderBar from "../../components/HeaderBar/HeaderBar.js"
import SliderList from "../../components/SliderList/SliderList.js";
import MyMap from "../../components/MyMap/MyMap.js"

import "./Home.css"

export default function Home() {
    const [announcements, setAnnouncements] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [first_name, setName] = useState('');
    const [navigate, setNavigate] = useState(false);
    const [searchValue, setSearchValue] = useState('');

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

    if (navigate) {
        return <Navigate to="/login"/>;
    }

    return (
        <div className="screen-2">
            <HeaderBar />

            <div className="search">
                <Link to={`/search/${searchValue}`}><img src={SearchIcon}/></Link>
                <input placeholder="Search for somebody!" onChange={(e) => setSearchValue(e.target.value)} />
            </div>

            <div className="create-button">
                <Link to="/add">
                    <MDBBtn rounded className='mx-2' color='secondary'>
                        &nbsp;&nbsp;Create Announcement!&nbsp;&nbsp;
                    </MDBBtn>
                </Link>
            </div>

            <div className="recommendations">
                <div className="recommendations-header">
                    <img src={Book} />
                    <h7>May interest you</h7>
                </div>

                {announcements ? (
                    <MDBListGroup style={{ marginLeft: '1.5em', width: '57em', overflowY:'scroll', maxHeight:'8.5em'}} light>
                        {announcements.map((item, index) => (
                            <MDBListGroupItem tag='a' href={'/announcement/'+item.id} action noBorders active aria-current='true' className='px-3' key={index}>
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
                    
                    <div className="map">
                        <MyMap locations={announcements} />
                    </div>
                </div>
            </div>

            <NavBar />
        </div>
        
    )
}
