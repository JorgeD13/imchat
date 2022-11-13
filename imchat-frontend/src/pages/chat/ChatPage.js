import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as BiIcons from "react-icons/bi";
import * as RiIcons from "react-icons/ri";
import * as IoIcons from "react-icons/io5";
import { io } from "socket.io-client";
import './ChatPage.scss';
import { Last } from "react-bootstrap/esm/PageItem";
import { getValue } from "@testing-library/user-event/dist/utils";
import { waitFor } from "@testing-library/react";
import { host, sendMessageRoute, allUsersRoute, recieveMessageRoute } from "./../../utils/APIRoutes";

const Contact = (props) => {
    const [seen, setSeen] = useState(props.element.seen);

    useEffect(() => {
        setSeen(props.element.seen);
        console.log("STA CAMIBANDO");
    }, [props.element.seen, props.change])

    if (props.id == props.actual) {
        if (!seen) {
            setSeen(true);
        }
        return (
            <div className="user" style={{backgroundColor: "gray"}}>
                <div className="name">
                    {props.element.username}
                </div>
                <div className="last-message">
                    {props.element.content}
                </div>
            </div>
        )
    }

    return (
        <div className="user" onClick={() => {setSeen(true)}}>
            <div className="name">
                {props.element.username}
            </div>
            <div className="last-message">
                {
                    props.element.user_from & !seen
                    ?
                    <div className="badge text-bg-success">{props.element.content}</div>
                    :
                    <div className="msg-no-visto">{props.element.content}</div>
                }
            </div>
        </div>
    )
}

const Textbox = (props) => {
    const me = props.other == props.sender;

    if (me) {
        return (
            <div className="container" style={{justifyContent: "flex-end"}} >
                <div className="wrapper-2">
                    <div className="msg">
                        {/* {props.other} */}
                        {/* {props.sender} */}
                        {props.msg}
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div className="container">
            <div className="wrapper">
                <div className="msg">
                    {/* {props.other} */}
                    {props.msg}
                </div>
            </div>
        </div>
    )
}

const ChatMsg = (props) => {
    const messagesEndRef = useRef(null);

    const [mymessages, setMymessages] = useState({
        user_from: "",
        user_to: "",
        messages: []
    });

    useEffect(() => {
        const scrollToBottomFast = () => { messagesEndRef.current?.scrollIntoView({}) }
        scrollToBottomFast();
    }, [mymessages, props.actual]);

    useEffect(() => {
        const scrollToBottom = () => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }) }
        scrollToBottom();
    }, [props.update])

    useEffect(() => {
        // console.log(mymessages["messages"]);
        setMymessages(props.messages);
        // console.log(mymessages["messages"]);
    }, [mymessages, props.update]);

    return (
        <div className="chat-msg">
            {mymessages["messages"].map((element, item) => {
                return(
                <React.Fragment key={item}>
                    <Textbox msg={element["content"]} sender={props.userID} other={element["user_from"]} />
                </React.Fragment>
                )
            })} 
            <div ref={messagesEndRef}></div>
        </div>
    );
}

const ChatPage = () => {
    const navigate = useNavigate();

    const socket = useRef();

    const [contacts, setContacts] = useState([
        {
            username: "",
            id: -1,
            content: "",
            user_from: -1,
            public_key: "",
            visto: false
        }
    ]);
    const [filteredContacts, setFilteredContacts] = useState([]);

    const [messages, setMessages] = useState({
        user_from: "",
        user_to: "",
        messages: []
    });
    
    const [update, setUpdate] = useState(0);
    const [change, setChange] = useState(0);
    const [actual, setActual] = useState(-1);
    const [actualID, setActualID] = useState(-1);

    const [msg, setMsg] = useState("");
    const [arrivalMessage, setArrivalMessage] = useState(null);

    const [currentUser, setCurrentUser] = useState(undefined);
    const [currentUserId, setCurrentUserId] = useState(undefined);

    useEffect(() => {
        async function session() {
            if (!localStorage.getItem("USER")) {
                navigate("/login");
            } else {
                setCurrentUser(
                    localStorage.getItem("USER")
                );
                setCurrentUserId(
                    localStorage.getItem("USER_ID")
                );
            }
        }
        session();
    }, []);

    useEffect(() => {
        async function loadContacts() {
            /* CONTACTOS */
            let data = await axios.post(allUsersRoute, {
                userId: localStorage.getItem("USER_ID")
            }).then(function(response) {
                console.log(response);
                setContacts(response.data);
                setFilteredContacts(response.data);
                // setActualID(-1);
                if (actualID == -1) {
                    setActualID(contacts[0].id);
                    setUpdate(!update);
                }
            });
        }
        if (currentUser) {
            loadContacts();
        }
    }, [currentUser])

    useEffect(() => {
        console.log(currentUser);
        if (currentUser) {
            socket.current = io(host);
            socket.current.emit("add-user",  currentUserId);
        }
    }, [currentUser]);

    useEffect(() => {
        if (currentUserId && actualID) {
            let data = axios.post(recieveMessageRoute, {
                user1: currentUserId.toString(),
                user2: actualID.toString()
            }).then(function(res) {
                if (res.status == 200 && actual!=-1) {
                    console.log(contacts);
                    console.log(actual);
                    if (res.length != 0) {
                        const dataToAssign = {
                            userFrom: currentUser,
                            userTo: contacts[actual].username,
                            messages: res.data
                        }
                        setMessages(dataToAssign);
                        setUpdate(!update);
    
                        let ccontacts = contacts;
                        // console.log(res);
                        // [res.data.length-1]
                        ccontacts[actual].content = res.data[res.data.length-1].content;
                        ccontacts[actual].visto = true;
                        setContacts(ccontacts);
                        setFilteredContacts(ccontacts);
                    }
                } else {
                    console.log("ERROR!");
                }
            });
        }
    }, [actual])

    const handleClick = async (i) => {
        setActual(i);
        setActualID(contacts[i].id);
        setUpdate(!update);

        // aqui se deben cambiar los mensajes
        
    }

    const handleSearch = (e) => {
        // filtar:
        if (e == " ") {
            setFilteredContacts(contacts);
        } else {
            const dataToAssign = contacts.filter(d => d.user.includes(e));
            if (dataToAssign.length != 0) {
                setFilteredContacts(dataToAssign);
                setUpdate(!update);
            } 
        }
    }

    const handleClickSubmit = async () => {
        // let msg = await document.getElementById("msg-input").value;

        if (msg != "") {
            let fecha = (new Date()).toISOString();
            let id_from = currentUserId;

            /* AXIOS */
            let data = await axios.post(sendMessageRoute, {
                user_from: id_from,
                user_to: actualID.toString(),
                content: msg,
                timestamp: fecha
            });

            /* SOCKET */
            socket.current.emit("send-msg", {
                from: id_from,
                to: actualID.toString(),
                msg: msg,
                timestamp: fecha
            });

            if (data.status == 200) {
                console.log("SUCCES");
            } else {
                console.log("FAILED");
            }

            /* HOOKS */
            let cmessages = messages;
            cmessages.messages.push({
                content: msg,
                user_to: actualID,
                user_from: localStorage.getItem("USER_ID"),
                timestamp: 0
            });
            setMessages(cmessages);

            /* ACTUALIZAR EL ÚLTIMO MENSAJE EN LOS CONTACTOS */ 
            let ccontacts = contacts;
            ccontacts[actual].content = msg;
            setContacts(ccontacts);
            setFilteredContacts(ccontacts);

            /* ACTUALIZAR EL RENDER Y LIMPIAR EL INPUT */
            setUpdate(!update);
            setMsg("");
        }
    }

    useEffect(() => {
        function listen() {
            console.log(socket.current);
            console.log(1);
            if (socket.current) {
                console.log("ARRIVAL MSG");
                socket.current.on("msg-recieve", (msg) => {
                    // setArrivalMessage({ fromSelf: false, message: msg });
                    setArrivalMessage({
                        content: msg.msg,
                        user_to: msg.to,
                        user_from: msg.from,
                        timestamp: msg.timestamp,
                        seen: false
                    });
                });
            }
        }
        listen();
      }, [currentUser]);

    useEffect(() => {
        function getIndex(contact, user_from) {
            return contact.id == user_from;
        }
        if (arrivalMessage) {
            if (contacts[actual] && arrivalMessage.user_from == contacts[actual].id) {
                // console.log(arrivalMessage);
                let cMessages = messages;
                cMessages.messages.push(arrivalMessage);
                setMessages(cMessages);
            }

            /* Encontrar el indice del array que tiene como id al usuario del cual llega el mensaje */
            let index = -1;
            for (let i=0; i<contacts.length; i++) {
                // console.log(contacts[i].id);
                // console.log(arrivalMessage.user_from);
                if (contacts[i].id == arrivalMessage.user_from) {
                    index = i;
                }
            }

            console.log(index);
            // console.log(contacts.find(function(element) { return element.id == arrivalMessage.user_from } ));
            let ccontacts = contacts;
            ccontacts[index].content = arrivalMessage.content;
            setContacts(ccontacts);
            setFilteredContacts(ccontacts);
            setChange(!change);
            setUpdate(!update);
        }
        // arrivalMessage && setMensajes((prev) => [...prev, arrivalMessage]);
      }, [arrivalMessage]);

    const LogOut = () => {
        localStorage.removeItem("USER");
        localStorage.removeItem("USER_ID");
        navigate("/login");
    }

    return (
        <div className="chat-page">
            {/* header */}
            <div className="navbar">
                <div className="search">
                    <input type="text" placeholder="Buscar" onKeyUp={(event) => handleSearch(event.target.value)} />
                    <div><BiIcons.BiSearchAlt/></div>
                    {/* <a>hola</a> */}
                </div>
                <div className="username">
                    <a>{ currentUser }</a>
                    <div onClick={LogOut}><RiIcons.RiDoorOpenFill /></div>
                </div>
            </div>
            {/* body */}
            <div className="body">
                <div className="contacts">
                    {
                    filteredContacts.map((element, item) => {
                        // console.log(element);
                        // {console.log(item)}
                        // console.log(data.indexOf(item));
                        return(
                            <React.Fragment key={item}>
                                <div onClick={() => handleClick(item)}>
                                    {/* <Contact name={element.user} msg={element.messages[element.messages.length-1][0]} id={item} actual={actual} slice={element.messages.slice(-1)} /> */}
                                    <Contact element={element} id={item} actual={actual} change={change} />
                                </div>
                            </React.Fragment>
                        )
                    })}
                </div>
                <div className="chat">
                    <ChatMsg actual={actual} update={update} messages={messages} userID={currentUserId} />

                    <div className="text-bar">
                        <div id="msg-input-container"><input id="msg-input" type="text" placeholder="Escribe un mensaje" value={msg} onChange={(e) => setMsg(e.target.value)} /></div>
                        <div id="msg-input-icon" onClick={() => handleClickSubmit()}><IoIcons.IoSend/></div>
                    </div>
                </div>
            </div>
        </div>
    )
    
}


export default ChatPage;