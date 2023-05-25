import React from 'react'

import Logo from "../../assets/icons/logo.svg";
import mailIcon from '../../assets/icons/mail.svg';
import lockIcon from '../../assets/icons/lock.svg';
import hideIcon from '../../assets/icons/hide.svg';

import './login.css'

export default function LoginPage() {
    return (
        <div className="screen-1">
            <img className='logo' src={Logo} />
            <form method="POST" action="">
                <div className="email">
                    <label for="email">Email Address</label>
                    <div className="sec-2">
                        <img src={mailIcon} />
                        <input type="email" name="email" placeholder="Username@gmail.com" />
                    </div>
                </div>
                <div className="password">
                    <label for="password">Password</label>
                    <div className="sec-2">
                        <img src={lockIcon} />
                        <input class="pas" type="password" name="password" placeholder="············" />
                        <img src={hideIcon} />
                    </div>
                </div>
                <input class="login" type="submit" value="Login"/>
            </form>
            <div class="footer"><span>Signup</span><span>Forgot Password?</span></div>
        </div>

        // <main className="form-signin w-100 m-auto">
        //     <form>
        //         <img className="mb-4" src={Logo} alt="" width="72" height="57"/>
        //             <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
        //
        //             <div className="form-floating">
        //                 <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com"/>
        //                     <label htmlFor="floatingInput">Email address</label>
        //             </div>
        //             <div className="form-floating">
        //                 <input type="password" className="form-control" id="floatingPassword" placeholder="Password"/>
        //                     <label htmlFor="floatingPassword">Password</label>
        //             </div>
        //
        //             <div className="checkbox mb-3">
        //                 <label>
        //                     <input type="checkbox" value="remember-me"/> Remember me
        //                 </label>
        //             </div>
        //             <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
        //             <p className="mt-5 mb-3 text-body-secondary">&copy; 2017–2023</p>
        //     </form>
        // </main>
    )
}
