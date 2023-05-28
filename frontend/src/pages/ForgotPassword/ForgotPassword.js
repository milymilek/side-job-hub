import Logo from "../../assets/icons/logo.svg";
import mailIcon from "../../assets/icons/mail.svg";
import lockIcon from "../../assets/icons/lock.svg";
import hideIcon from "../../assets/icons/hide.svg";
import React from "react";
import {Link} from "react-router-dom";

import '../Login/Login.css'

export default function ForgotPassword() {
    return (
        <div className="screen-1">
            <img className='logo' src={Logo} />
            <h4>Forgot your password?</h4>
            <h8>Enter your email address below and we'll send your password reset instructions by email.</h8>
            <form method="POST" action="">
                <div className="email">
                    <label htmlFor="email">Email Address</label>
                    <div className="sec-2">
                        <img src={mailIcon}/>
                        <input type="email" name="email" placeholder="Username@gmail.com"/>
                    </div>
                </div>
                <input class="login" type="submit" value="Forgot password"/>
            </form>
            <div class="footer">
                <span><Link to="/login"> Sign in </Link></span>
            </div>
        </div>
    )
}