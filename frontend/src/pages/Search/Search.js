import React from 'react'
import { useState, useEffect } from "react";
import {Link, Navigate, useParams} from 'react-router-dom'
import axios from "axios";

import { MDBListGroup, MDBListGroupItem, MDBBtn } from 'mdb-react-ui-kit';

import SearchIcon from "../../assets/icons/search.svg"

import NavBar from "../../components/NavBar/NavBar.js"
import HeaderBar from "../../components/HeaderBar/HeaderBar.js"
import SliderList from "../../components/SliderList/SliderList.js";
import MyMap from "../../components/MyMap/MyMap.js"

import "../../pages/Home/Home.css"

export default function Search() {
    const { query } = useParams();
    const [announcements, setAnnouncements] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await fetch(
                    `http://localhost:8000/announcements/search/${query}`
                );
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

    return (
        <div className="screen-2">
            <HeaderBar />

            <div className="search">
                <img src={SearchIcon}/>
                <input placeholder="Search for somebody!" value={query} onChange={() => {}} />
            </div>

            <div className="recommendations">

                {announcements ? (
                    <MDBListGroup style={{ marginLeft: '1.5em', width: '57em', overflowY:'scroll', maxHeight:'32em', minHeight:'32em'}} light>
                        {announcements.map((item, index) => (
                            <MDBListGroupItem tag='a' href={'/announcement/'+item.id} action noBorders active aria-current='true' className='px-3' key={index}>
                                <h5 style={{ fontWeight: 'bold', fontSize: '1.2em' }}>{item.title}</h5>
                                <p style={{ fontSize: '0.8em', color: 'gray', marginLeft: "2em" }}>{item.description}</p>
                                <h7 style={{color: 'gray', display: 'inline'}}>Dodano przez: </h7>
                                <p style={{fontSize: '0.8em', display: 'inline'}}>{item.created_by.first_name}</p>
                            </MDBListGroupItem>
                        ))}
                    </MDBListGroup>
                ) : (
                    <p>Loading announcements...</p>
                )}
            </div>


            <NavBar />
        </div>
        
    )
}
