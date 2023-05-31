import React, {useState, useEffect} from 'react'
import {Link, Navigate} from 'react-router-dom'

import Logo from "../../assets/icons/logo.svg";
import Logout from "../../assets/icons/logout.svg"
import Search from "../../assets/icons/search.svg";

import HeaderBar from "../../components/HeaderBar/HeaderBar.js"
import NavBar from "../../components/NavBar/NavBar.js"
import MyMapSelect from "../../components/MyMapSelect/MyMapSelect.js"

import "../Home/Home.css"
import axios from "axios";


export default function Add() {
    const [id, setId] = useState(null);

    useEffect(() => {
        (
            async () => {
                const {data} = await axios.get("authentication/user/", {withCredentials: true});
                setId(data.id);
                
                setAnnouncement((prevState) => ({
                    ...prevState,
                    created_by: data.id
                  }));
            }
        )();
    }, []);

    const [announcement, setAnnouncement] = useState({
        title: '',
        description: '',
        price: '',
        availability: '',
        contact: '',
        longitude: 0,
        latitude: 0,
        created_by: id
      });
    const [navigate, setNavigate] = useState(false);

    const submit = async e => {
        e.preventDefault();

        try {
            const response = await axios.post('announcements/create_announcement/', announcement);
            setNavigate(true);
          } catch (error) {
            console.error(error);
          }

        setNavigate(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAnnouncement((prevState) => ({
          ...prevState,
          [name]: value
        }));
    };

    const handleLocationSelect = (location) => {
        setAnnouncement((prevState) => ({
            ...prevState,
            longitude: location.lng,
            latitude: location.lat
          }));
    };
    

    if (navigate) {
        return <Navigate to="/home"/>;
    }

    return (
        <div className="screen-2">
            <HeaderBar />

            <form className="form-add" onSubmit={submit}>
                <div class="form-outline mb-4">
                    <input type="text" id="form7Example1" class="form-control" name="title" value={announcement.title} onChange={handleInputChange} />
                    <label class="form-label" for="form7Example1">Title</label>
                </div>

                <div class="roww mb-4" style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                    <div class="col">
                        <div class="form-outline mb-4">
                            <textarea class="form-control" id="form6Example7" rows="4" name="description" value={announcement.description} onChange={handleInputChange} ></textarea>
                            <label class="form-label" for="form6Example7">Description</label>
                        </div>
                    </div>
                    <div class="col">
                        <div class="form-outline mb-4">
                            <MyMapSelect onLocationSelect={handleLocationSelect} />
                            <label class="form-label" for="form6Example7">Location</label>
                        </div>
                    </div>
                </div>

                <div class="form-outline mb-4">
                    <input type="text" id="form7Example1" class="form-control" name="price" value={announcement.price} onChange={handleInputChange} />
                    <label class="form-label" for="form7Example1">Price</label>
                </div>

                <div class="form-outline mb-4">
                    <input type="text" id="form7Example1" class="form-control" name="availability" value={announcement.availability} onChange={handleInputChange} />
                    <label class="form-label" for="form7Example1">Availability</label>
                </div>

                <div class="form-outline mb-4">
                    <input type="text" id="form7Example1" class="form-control" name="contact" value={announcement.contact} onChange={handleInputChange} />
                    <label class="form-label" for="form7Example1">Contact</label>
                </div>

                

                <button type="submit" class="btn btn-primary btn-block mb-4">Submit</button>
            </form>

            <NavBar />
        </div>
    )
}
