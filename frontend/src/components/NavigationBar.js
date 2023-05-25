import React from "react";

import Home from "../assets/icons/home.svg"
import Inbox from "../assets/icons/inbox.svg"
import Profile from "../assets/icons/profile.svg"
import Blank from "../assets/icons/blank.svg"

import "./NavigationBar.css";

function NavigationBar() {
    return (
        <div class="nav__menu" id="nav-menu">
            <ul class="nav__list">
                <li class="nav__item">
                    <a href="#home" class="nav__link active-link">
                        <img src={Home}/>
                        <span class="nav__name">Home</span>
                    </a>
                </li>
                
                <li class="nav__item">
                    <a href="#blank" class="nav__link">
                        <img src={Blank}/>
                        <span class="nav__name">Blank</span>
                    </a>
                </li>

                <li class="nav__item">
                    <a href="#Inbox" class="nav__link">
                        <img src={Inbox}/>
                        <span class="nav__name">Inbox</span>
                    </a>
                </li>

                <li class="nav__item">
                    <a href="#Profile" class="nav__link">
                        <img src={Profile}/>
                        <span class="nav__name">Profile</span>
                    </a>
                </li>
            </ul>
        </div>
    );
}

export default NavigationBar;