import React, {useState, useEffect} from 'react'
import {Link, Navigate, useParams} from 'react-router-dom'

import Logo from "../../assets/icons/logo.svg";
import Logout from "../../assets/icons/logout.svg"
import Search from "../../assets/icons/search.svg";
import Avatar from "../../assets/avatars/default.jpg"
import Send from "../../assets/icons/send.svg"

import NavBar from "../../components/NavBar/NavBar.js"
import HeaderBar from "../../components/HeaderBar/HeaderBar.js"
import { createConversationName } from '../../utils';
import MyMap from "../../components/MyMap/MyMap.js"

import "../Home/Home.css"
import "./Announcement.css"
import axios from "axios";


export default function Announcement() {
    const { id } = useParams();

    const [name, setName] = useState(null);
    const [announcement, setAnnouncement] = useState(null);

    useEffect(() => {
        const fetchAnnouncement = async () => {
          try {
            const response = await fetch('http://localhost:8000/announcements/'+id+'/');
            const data = await response.json();
            setAnnouncement(data);
          } catch (error) {
            console.log('Error fetching announcement:', error);
          }
        };
    
        fetchAnnouncement();
    }, []);

    useEffect(() => {
        (
            async () => {
                const {data} = await axios.get("authentication/user/", {withCredentials: true});
                setName(data.first_name);
            }
        )();
    }, []);

    console.log(announcement);


    if (!announcement) {
        return <p>Loading announcement...</p>;
    }

    return (
        <div className="screen-2">
            <HeaderBar />

            <div class='announcement-user'>
                <img className='avatar' src={Avatar}/>
                <h1 id='name'>{announcement.created_by.first_name}</h1>
                <Link to={`/dm/${createConversationName(name, announcement.created_by.first_name)}`}><img className='send' src={Send}/></Link>
            </div>
            
            <div class="announcement">
                <h1 id="title">{announcement.title}</h1>
                <p id="description">{announcement.description}</p>
                <p><strong>Price: {announcement.price}</strong> <span id="price"></span></p>
                <p><strong>Availability: {announcement.availability}</strong> <span id="availability"></span></p>
                <p><strong>Contact: {announcement.contact}</strong> <span id="contact"></span></p>

            </div>
            
            <div className="map-widget">
                <div className="offers-near">
                    <div className="map">
                        <MyMap locations={[announcement]} startLocation={[announcement.longitude, announcement.latitude]} />
                    </div>
                </div>
            </div>

            <NavBar />
        </div>
    )
}
