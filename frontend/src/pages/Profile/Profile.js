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


export default function Profile() {
    const [id, setId] = useState(null);
    const [avatar, setAvatar] = useState({id: null, avatar: null});

    useEffect(() => {
        (
            async () => {
                const {data} = await axios.get("authentication/user/", {withCredentials: true});
                setId(data.id);
                
                setAvatar((prevState) => ({
                    ...prevState,
                    id: data.id
                  }));
            }
        )();
    }, []);


    const submit = async e => {
        e.preventDefault();
        try {
            const response = await axios.post('users/update_avatar/', avatar);
            console.log(response);
          } catch (error) {
            console.error(error);
          }
    };

    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        setAvatar((prevState) => ({
            ...prevState,
            avatar: file.name
          }));
      };

      console.log(avatar);
    
    
    return (
        <div className="screen-2">
            <HeaderBar />

            <form className="form-add" onSubmit={submit}>
                <div class="form-outline mb-4">
                    <label class="form-label" for="customFile">Avatar</label>
                    <input type="file" class="form-control" id="customFile" onChange={handleFileSelect}/>
                </div>

                <button type="submit" class="btn btn-primary btn-block mb-4">Submit</button>
            </form>

            <NavBar />
        </div>
    )
}
