import React, {useState, useEffect, useRef } from 'react';
import useWebSocket, { ReadyState } from "react-use-websocket";
import { Link, useParams } from 'react-router-dom';
import { useHotkeys } from "react-hotkeys-hook";
import axios from "axios";

import NavBar from "../../components/NavBar/NavBar.js";
import HeaderBar from "../../components/HeaderBar/HeaderBar.js"
import Avatar from "../../assets/avatars/pudzian_avatar.jpg";

import "./Chat.css";
import {extractReceiver, calculateTimeAgo} from "../../utils"


export default function Chat() {
    const { conversationName } = useParams();

    const [message, setMessage] = useState("");
    const [name, setName] = useState("");
    const [token, setToken] = useState("");
    const [messageHistory, setMessageHistory] = useState<any>([]);
    const [pastConversations, setPastConversations] = useState<any>([]);

    const [participants, setParticipants] = useState<string[]>([]);
    const [typing, setTyping] = useState(false);
    const [meTyping, setMeTyping] = useState(false);
    const timeout = useRef<any>();
    
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
            case 'chat_message_echo':
                setMessageHistory((prev:any) => prev.concat(data.message));
                break;
            case "last_50_messages":
                setMessageHistory(data.messages);
                setPastConversations(data.past_conversations);
                break;
            case "user_join":
                setParticipants((pcpts: string[]) => {
                    if (!pcpts.includes(data.user)) {
                        return [...pcpts, data.user];
                    }
                    return pcpts;
                });
                break;
            case "user_leave":
                setParticipants((pcpts: string[]) => {
                    const newPcpts = pcpts.filter((x) => x !== data.user);
                    return newPcpts;
                });
                break;
            case "online_user_list":
                setParticipants(data.users);
                break;
            case 'typing':
                updateTyping(data);
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
        onType();
    }

    function handleSubmit() {
        if (message.length === 0) return;

        sendJsonMessage({
            type: "chat_message",
            message,
            name
        });
        setMessage("");
        clearTimeout(timeout.current);
        timeoutFunction();
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

    const inputReference: any = useHotkeys(
        "enter",
        () => {
          handleSubmit();
        },
        {
          enableOnTags: ["INPUT"]
        }
      );
      
    useEffect(() => {
        (inputReference.current as HTMLElement).focus();
    }, [inputReference]);
    
    function timeoutFunction() {
        setMeTyping(false);
        sendJsonMessage({ type: "typing", typing: false });
    }
    
    function onType() {
    if (meTyping === false) {
        setMeTyping(true);
        sendJsonMessage({ type: "typing", typing: true });
        timeout.current = setTimeout(timeoutFunction, 5000);
    } else {
        clearTimeout(timeout.current);
        timeout.current = setTimeout(timeoutFunction, 5000);
    }
    }
    
    useEffect(() => () => clearTimeout(timeout.current), []);


    function updateTyping(event: { user: string; typing: boolean }) {
        if (event.user !== name) {
          setTyping(event.typing);
        }
      }


    return (
        <div className="screen-2">
            <HeaderBar />
            <div className="row">
                <div className="col-md-6 col-lg-5 col-xl-4 mb-4 mb-md-0">
                    <div className="conversations">
                    <div className="card-body">
                        <ul className="list-unstyled mb-0">
                            {pastConversations.map((conversation: any, idx: number) => (
                                <li className="p-2 border-bottom" style={style1}>
                                    <Link to={`/dm/${conversation.name}`}>
                                        <div className="d-flex justify-content-between" style={{textDecoration: "none"}}>
                                            <div className="d-flex flex-row">
                                                <img src={require(`../../assets/avatars/${conversation.other_user.avatar}`)} alt="avatar"
                                                className="rounded-circle d-flex align-self-center me-3 shadow-1-strong" width="60"/>
                                                <div className="pt-1">
                                                <p className="fw-bold mb-0">{extractReceiver(conversation.name, name)}</p>
                                                <p className="small text-muted">{conversation.last_message.content}</p>
                                                <p className="small text-muted">{(typing && (conversation.name == conversationName)) ? "Typing..." : ""}</p>
                                                </div>
                                            </div>
                                            <div className="pt-1">
                                                <p className="small text-muted mb-1">{calculateTimeAgo(conversation.last_message.timestamp)}</p>
                                                <span className="badge bg-success float-end">
                                                    {participants.includes(conversation.other_user.first_name) ? "Active" : ""}
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    </div>
                </div>

                <div className="chatting-window">
                    <div className="chatting">
                        <div className="col-md-6 col-lg-7 col-xl-8" style={{width: "620px"}}>
                            <ul className="list-unstyled" style={{overflowY:'scroll', maxHeight:'570px'}}>
                                {messageHistory.map((message: any, idx: number) => (
                                    <div className="message" key={idx}>
                                        <img src={require(`../../assets/avatars/${message.from_user.avatar}`)} alt="avatar"
                                            className="rounded-circle d-flex align-self-start me-3 shadow-1-strong"/>
                                        <div className="message-body">
                                            <div className="card-header d-flex justify-content-between p-2">
                                                <p className="fw-bold mb-0">{message.from_user.first_name}&nbsp;&nbsp;</p>
                                                <p className="text-muted small mb-0"><i className="far fa-clock"></i> {calculateTimeAgo(message.timestamp)}</p>
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
                            ref={inputReference}
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