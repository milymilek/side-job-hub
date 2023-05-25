import React from 'react'
import { Link } from 'react-router-dom'

import NavigationBar from "../NavigationBar"
import Avatar from "../../assets/avatars/pudzian_avatar.jpg"

import "./chat.css"


export default function Chat() {
    return (
        <div>
            <div className="chat">
                <div className="header-chat">
                    <div className='desc'>
                        <div className="chevron"></div>
                        <div className="avtar">
                            <img src={Avatar} alt=""/>
                        </div>
                        <div className="content">
                        <div className="name">
                            Samuel Green
                        </div>
                        <div className="status">
                            Available to Walk
                        </div>
                        </div>
                        <div className="dots"></div>
                    </div>
                </div>

                <div className='messages'>
                    <div className="text reply">
                        That sounds great. I’d be happy with that.
                    </div>
                    <div className="text reply">
                        Could you send over some pictures of your dog, please?
                    </div>

                    <div className="text user">
                        Here are a few pictures. She’s a happy girl!
                    </div>

                    <div className="text user user1">
                        Can you make it?
                    </div>

                    <div className="text reply">
                        She looks so happy! The time we discussed works. How long shall I take her out for?
                    </div>

                    <div className="offer">
                        <div></div>
                        <p>30 minute walk</p>
                        <span>$29</span>
                    </div>

                    <div className="offer">
                        <div></div>
                        <p className="hour">1 hour walk</p>
                        <span>$49</span>
                    </div>

                    <form action="#">
                        <input className="user-input" type="text" placeholder="Type a message..."/>
                        <div className="arrow">{">"}</div>
                    </form>
                </div>
            </div>
            <NavigationBar/>
        </div>
    );
}
