import {React, useState} from "react";
import {Link, Navigate} from "react-router-dom";
import axios from "axios";

import Logo from "../../assets/icons/logo.svg";
import mailIcon from "../../assets/icons/mail.svg";
import lockIcon from "../../assets/icons/lock.svg";
import hideIcon from "../../assets/icons/hide.svg";

import './Login.css'

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [navigate, setNavigate] = useState(false);

    const submit = async e => {
        e.preventDefault()
        const {data} = await axios.post("authentication/login/",
            {email, password},
            {withCredentials: true}
        );

        axios.defaults.headers.common['Authorization'] = `Bearer ${data['jwt']}`;

        setNavigate(true);
    }

    if (navigate) {
        return <Navigate to="/home"/>;
    }

    return (
        <div className="screen-1">
            <img className='logo' src={Logo} />
            <form onSubmit={submit}>
                <div className="email">
                    <label for="email">Email Address</label>
                    <div className="sec-2">
                        <img src={mailIcon} />
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
                <input class="login" type="submit" value="Login"/>
            </form>
            <div class="footer">
                <span><Link to="/register"> Sign up </Link></span>
                <span><Link to="/forgotpassword"> Forgot password? </Link></span>
            </div>
        </div>
    )
}