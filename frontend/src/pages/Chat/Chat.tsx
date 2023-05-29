import React, {useState, useEffect} from 'react';
import useWebSocket, { ReadyState } from "react-use-websocket";
import { Link, useParams } from 'react-router-dom';

import NavBar from "../../components/NavBar/NavBar.js";
import HeaderBar from "../../components/HeaderBar/HeaderBar.js"
import Avatar from "../../assets/avatars/pudzian_avatar.jpg";

import axios from "axios";

import "./Chat.css";


export default function Chat() {
    const { conversationName } = useParams();

    const [message, setMessage] = useState("");
    const [name, setName] = useState("");
    const [avatar, setAvatar] = useState("");
    const [token, setToken] = useState("");
    const [welcomeMessage, setWelcomeMessage] = useState("");
    const [messageHistory, setMessageHistory] = useState<any>([]);
    
    const webSocketUrl = name ? `ws://127.0.0.1:5000/chat_socket/${conversationName}` : null;
    const { readyState, sendJsonMessage } = useWebSocket(webSocketUrl, {
        queryParams: {
            token: name ? token : "",
        },
        onOpen: () => {
        console.log("Connected!");
        },
        onClose: () => {
        console.log("Disconnected!");
        },

        onMessage: (e) => {
        const data = JSON.parse(e.data);
            switch (data.type) {
            case "welcome_message":
                setWelcomeMessage(data.message);
                break;
            case 'chat_message_echo':
                setMessageHistory((prev:any) => prev.concat(data.message));
                break;
            case "last_50_messages":
                setMessageHistory(data.messages);
                break;
            default:
                break;
            }
        }
    });

    useEffect(() => {
        (
            async () => {
                const {data} = await axios.get("authentication/user/", {withCredentials: true});
                setName(data.first_name);
                setAvatar(data.avatar);
            }
        )();
    }, []);

    useEffect(() => {
        (
            async () => {
                const {data} = await axios.get("authentication/token/", {withCredentials: true});
                setToken(data.jwt);
            }
        )();
    }, []);

    function handleChangeMessage(e: any) {
        setMessage(e.target.value);
    }

    function handleSubmit() {
        sendJsonMessage({
            type: "chat_message",
            message,
            name
        });
        setMessage("");
    }

    const connectionStatus = {
        [ReadyState.CONNECTING]: "Connecting",
        [ReadyState.OPEN]: "Open",
        [ReadyState.CLOSING]: "Closing",
        [ReadyState.CLOSED]: "Closed",
        [ReadyState.UNINSTANTIATED]: "Uninstantiated"
    }[readyState];

    console.log(connectionStatus);

    const style1 = {
        backgroundColor: "#eee",
    };

    console.log(messageHistory);

    return (
        <div className="screen-2">
            <HeaderBar />
            <div className="row">
                <div className="col-md-6 col-lg-5 col-xl-4 mb-4 mb-md-0">
                    <div className="conversations">
                    <div className="card-body">

                        <ul className="list-unstyled mb-0">
                        {/* <li className="p-2 border-bottom" style={style1}>
                            <a href="#!" className="d-flex justify-content-between">
                            <div className="d-flex flex-row">
                                <img src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-8.webp" alt="avatar"
                                className="rounded-circle d-flex align-self-center me-3 shadow-1-strong" width="60"/>
                                <div className="pt-1">
                                <p className="fw-bold mb-0">John Doe</p>
                                <p className="small text-muted">Hello, Are you there?</p>
                                </div>
                            </div>
                            <div className="pt-1">
                                <p className="small text-muted mb-1">Just now</p>
                                <span className="badge bg-danger float-end">1</span>
                            </div>
                            </a>
                        </li> */}
                        </ul>
                    </div>
                    </div>
                </div>


                {/* <div className="conversations-window">
                    <div className="conversations">

                    </div>
                </div> */}

                <div className="chatting-window">
                    <div className="chatting">
                        <div className="col-md-6 col-lg-7 col-xl-8" style={{width: "620px"}}>
                            <ul className="list-unstyled" style={{overflowY:'scroll', maxHeight:'570px'}}>
                                {messageHistory.map((message: any, idx: number) => (
                                    <div className="message" key={idx}>
                                        <img src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp" alt="avatar"
                                            className="rounded-circle d-flex align-self-start me-3 shadow-1-strong"/>
                                        <div className="message-body">
                                            <div className="card-header d-flex justify-content-between p-2">
                                                <p className="fw-bold mb-0">{message.from_user.first_name}&nbsp;&nbsp;</p>
                                                <p className="text-muted small mb-0"><i className="far fa-clock"></i> {idx} mins ago</p>
                                            </div>
                                            <div className="message-content">
                                                <p className="mb-0">{message.content}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="messaging">
                        <input
                            className="form-outline"
                            type="text"
                            name="message"
                            placeholder='Message'
                            onChange={handleChangeMessage}
                            value={message}
                            style={{borderRadius: '4px'}}
                        />
                        <button className="btn btn-info btn-rounded float-end" onClick={handleSubmit}>
                            Send
                        </button>  
                    </div>
                </div>    
            </div>
            <NavBar/>
        </div>
    );
};