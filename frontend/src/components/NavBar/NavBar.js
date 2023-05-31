import React, { useState, useEffect } from 'react';
import {Link, useLocation} from 'react-router-dom'
import {
  MDBNavbar,
  MDBContainer,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBDropdown,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBDropdownItem,
} from 'mdb-react-ui-kit';

import Home from "../../assets/icons/home.svg"
import Inbox from "../../assets/icons/inbox.svg"
import Profile from "../../assets/icons/profile.svg"
import "./NavBar.css";

export default function App() {
  const [showNavCentred, setShowNavCentred] = useState(false);
  const location = useLocation();
  const [url, setUrl] = useState(null);
  useEffect(() => {
    setUrl(location.pathname);
  }, [location]);

  return (
    <div className="navbar">
        <MDBNavbar expand='lg' light bgColor='light'>
        <MDBContainer fluid>
            <MDBNavbarToggler
            type='button'
            data-target='#navbarCenteredExample'
            aria-controls='navbarCenteredExample'
            aria-expanded='false'
            aria-label='Toggle navigation'
            onClick={() => setShowNavCentred(!showNavCentred)}
            >
            <MDBIcon icon='bars' fas />
            </MDBNavbarToggler>

            <MDBCollapse navbar show={showNavCentred} center id='navbarCenteredExample'>
            <MDBNavbarNav fullWidth={false} className='mb-2 mb-lg-0'>
                <Link to="/home" style={{ textDecoration: 'none' }}>
                    <MDBNavbarItem style={{ padding: '1.5em' }}>
                        <div className="navbar-el">
                            <img src={Home}/>
                            <MDBNavbarLink className={(url === "/home" ? "active" : "")} aria-current='page'>
                                Home
                            </MDBNavbarLink>
                        </div>
                    </MDBNavbarItem> 
                </Link>


                <Link to="/dm" style={{ textDecoration: 'none' }}>
                    <MDBNavbarItem style={{ padding: '1.5em' }}>
                        <div className="navbar-el">
                            <img src={Inbox}/>
                            <MDBNavbarLink className={(url === "/dm" ? "active" : "")}>Inbox</MDBNavbarLink>
                        </div>
                    </MDBNavbarItem>   
                </Link>


                <Link to="/profile" style={{ textDecoration: 'none' }}>
                    <MDBNavbarItem style={{ padding: '1.5em' }}>
                        <div className="navbar-el">
                            <img src={Profile}/>
                            <MDBNavbarLink className={(url === "/profile" ? "active" : "")}>Profile</MDBNavbarLink>
                        </div>
                    </MDBNavbarItem>
                </Link>


            </MDBNavbarNav>
            </MDBCollapse>
        </MDBContainer>
        </MDBNavbar>
    </div>

  );
}