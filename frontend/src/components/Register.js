import Logo from "../assets/icons/logo.svg";
import mailIcon from "../assets/icons/mail.svg";
import lockIcon from "../assets/icons/lock.svg";
import hideIcon from "../assets/icons/hide.svg";
import {React, useState} from "react";
import {Link, Navigate} from "react-router-dom";
import axios from "axios";

import './pages/login.css'

export const Register = () => {
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [navigate, setNavigate] = useState(false);

    const submit = async e => {
        e.preventDefault();
        await axios.post("register/", {first_name, last_name, email, password});
        setNavigate(true);
    }

    if (navigate) {
        return <Navigate to="/login"/>;
    }

    return (
        <div className="screen-1">
            <img className='logo' src={Logo} />
            <form onSubmit={submit}>
                <div className="email">
                    <label for="email">First name</label>
                    <div className="sec-2">
                        <img src={mailIcon} />
                        <input name="first_name" placeholder="John"
                            onChange={e => setFirstName(e.target.value)}
                        />
                    </div>
                </div>
                <div className="email">
                    <label htmlFor="email">Last name</label>
                    <div className="sec-2">
                        <img src={mailIcon}/>
                        <input name="last_name" placeholder="Smith"
                            onChange={e => setLastName(e.target.value)}
                        />
                    </div>
                </div>
                <div className="email">
                    <label htmlFor="email">Email Address</label>
                    <div className="sec-2">
                        <img src={mailIcon}/>
                        <input type="email" name="email" placeholder="Username@gmail.com"
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                </div>
                <div className="password">
                    <label for="password">Password</label>
                    <div className="sec-2">
                        <img src={lockIcon} />
                        <input class="pas" type="password" name="password" placeholder="············"
                            onChange={e => setPassword(e.target.value)}
                        />
                        <img src={hideIcon} />
                    </div>
                </div>
                {/*<div className="password">*/}
                {/*    <label htmlFor="password">Repeat password</label>*/}
                {/*    <div className="sec-2">*/}
                {/*        <img src={lockIcon}/>*/}
                {/*        <input className="pas" type="password" name="repeat_password" placeholder="············"/>*/}
                {/*        <img src={hideIcon}/>*/}
                {/*    </div>*/}
                {/*</div>*/}
                <button class="login" type="submit">Register</button>
            </form>
            <div class="footer">
                <span><Link to="/login"> Sign in </Link></span>
            </div>
        </div>
    )
}