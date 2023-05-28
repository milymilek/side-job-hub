// import React from "react";

// import Home from "../../assets/icons/home.svg"
// import Inbox from "../../assets/icons/inbox.svg"
// import Profile from "../../assets/icons/profile.svg"
// import Blank from "../../assets/icons/blank.svg"

// import "./NavBar.css";



// export default function NavBar() {
//     return (
//         <div class="nav__menu" id="nav-menu">
//             <ul class="nav__list">
//                 <li class="nav__item">
//                     <a href="/home" class="nav__link active-link">
//                         <img src={Home}/>
//                         <span class="nav__name">Home</span>
//                     </a>
//                 </li>
                
//                 <li class="nav__item">
//                     <a href="#blank" class="nav__link">
//                         <img src={Blank}/>
//                         <span class="nav__name">Blank</span>
//                     </a>
//                 </li>

//                 <li class="nav__item">
//                     <a href="/dm" class="nav__link">
//                         <img src={Inbox}/>
//                         <span class="nav__name">Inbox</span>
//                     </a>
//                 </li>

//                 <li class="nav__item">
//                     <a href="/profile" class="nav__link">
//                         <img src={Profile}/>
//                         <span class="nav__name">Profile</span>
//                     </a>
//                 </li>
//             </ul>
//         </div>
//     );
// };


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

  console.log(url);

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
                            <img src={Home}/>
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