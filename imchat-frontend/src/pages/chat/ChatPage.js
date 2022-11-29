import React, { useState, useEffect, useRef } from "react";
import secureLocalStorage from "react-secure-storage"
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
import deriveKey from "../../privacy/deriveKey";
import encrypt from "../../privacy/encrypt"
import decrypt from "../../privacy/decrypt"

const Contact = (props) => {
    // const [seen, setSeen] = useState(props.element.seen);

    // useEffect(() => {
    //     setSeen(props.element.seen);
    //     console.log("STA CAMIBANDO");
    // }, [props.element.seen, props.change])

    if (props.id == props.actual) {
        // if (!seen) {
        //     setSeen(true);
        // }
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
        <div className="user">
            {/* onClick={() => {setSeen(true)}} */}
            <div className="name">
                {props.element.username}
            </div>
            <div className="last-message">
                {props.element.content}
                {/* {
                    props.element.user_from != props.me & !seen
                    ?
                    <div className="badge text-bg-success">{props.element.content}</div>
                    :
                    <div className="msg-visto">{props.element.content}</div>
                } */}
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
    }, [props.update]);

    return (
        <div className="chat-msg">
            {   mymessages ?
                mymessages["messages"].map((element, item) => {
                return(
                <React.Fragment key={item}>
                    <Textbox msg={element["content"]} sender={props.userID} other={element["user_from"]} />
                </React.Fragment>
                )
                })
                : <></>
            } 
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

    const [messages, setMessages] = useState(undefined);
    // {
    //     user_from: "",
    //     user_to: "",
    //     messages: []
    // }
    
    const [update, setUpdate] = useState(0);
    const [actual, setActual] = useState(-1);
    const [actualID, setActualID] = useState(-1);

    const [msg, setMsg] = useState("");
    const [arrivalMessage, setArrivalMessage] = useState(null);

    const [currentUser, setCurrentUser] = useState(undefined);
    const [currentUserId, setCurrentUserId] = useState(undefined);

    // var derivedKey = undefined;
    // const [derivedKey, setDerivedKey] = useState(undefined);

    useEffect(() => {
        async function session() {
            if (!secureLocalStorage.getItem("USER")) {
                navigate("/login");
            } else {
                setCurrentUser(
                    secureLocalStorage.getItem("USER")
                );
                setCurrentUserId(
                    secureLocalStorage.getItem("USER_ID")
                );
            }
        }
        session();
    }, []);

    useEffect(() => {
        async function loadContacts() {
            /* CONTACTOS */
            let data = await axios.post(allUsersRoute, {
                userId: secureLocalStorage.getItem("USER_ID")
            })
            /*
            .then(function(response) {
                console.log(response);
                for (let i = 0; i < response.data.length; i++) {
                    console.log(response.data[i].content);
                    if (response.data[i].content != null) {
                        deriveKey(JSON.parse(response.data[i].public_key), secureLocalStorage.getItem("PRIVATE_KEY"))
                        .then(function(dk) {
                            decrypt(response.data[i].content, dk)
                            .then(function(decrypted_msg) {
                                response.data[i].content = decrypted_msg;
                            })
                        })
                    }
                }
                setContacts(response.data);
                setFilteredContacts(response.data);
                if (actualID == -1) {
                    setActualID(contacts[0].id);
                    setUpdate(!update);
                }
            });
            */
            console.log(data);
            for (let i = 0; i < data.data.length; i++) {
                console.log(data.data[i].content);
                if (data.data[i].content != null) {
                    deriveKey(JSON.parse(data.data[i].public_key), secureLocalStorage.getItem("PRIVATE_KEY"))
                    .then(function(dk) {
                        decrypt(data.data[i].content, dk)
                        .then(function(decrypted_msg) {
                            data.data[i].content = decrypted_msg;
                        })
                    })
                }
            }

            setContacts(data.data);
            setFilteredContacts(data.data);
            setActualID(contacts[0].id);
            setUpdate(!update);
        }
        
        if (currentUser) {
            loadContacts();
        }
    }, [currentUser])

    useEffect(() => {
        console.log(currentUser);
        if (currentUser) {
            socket.current = io(host);
            socket.current.emit("add-user",  currentUserId.toString());
        }
    }, [currentUser]);

    useEffect(() => {
        if (currentUserId && actualID) {
            let data = axios.post(recieveMessageRoute, {
                user1: currentUserId.toString(),
                user2: actualID.toString()
            }).then(function(res) {
                if (res.status == 200 && actual!=-1) {
                    console.log(res);
                    if (res.length != 0 && res.data.length != 0) {
                        deriveKey(JSON.parse(contacts[actual].public_key), secureLocalStorage.getItem("PRIVATE_KEY"))
                        .then(function(dk) {
                            var copyres = res.data;
                            for (let i = 0; i < copyres.length; i++) {
                                decrypt(copyres[i].content, dk)
                                .then(function(decrypted_msg) {
                                    copyres[i].content = decrypted_msg;
                                })
                            }
                            
                            return copyres;
                            /*                            
                            .then(function(copyres) {
                                const dataToAssign = {
                                    user_from: currentUser,
                                    user_to: contacts[actual].username,
                                    messages: Array.from(copyres)
                                }
                                return dataToAssign;
                            })
                            */

                            // let ccontacts = contacts;
                            // console.log(messages.messages);
                            // ccontacts[actual].content = messages.messages[res.data.length-1].content;
                            // ccontacts[actual].visto = true;
                            // setContacts(ccontacts);
                            // setFilteredContacts(ccontacts);
                            // // setUpdate(!update);
                        })
                        .then(function(copyres) {
                            console.log(copyres);
                            setMessages({
                                user_from: currentUser,
                                user_to: contacts[actual].username,
                                messages: copyres
                            });
                            setUpdate(!update);
                            console.log(messages);
                        })
                        .then(function() {
                            let ccontacts = contacts;
                            console.log(messages.messages);
                            ccontacts[actual].content = messages.messages[res.data.length-1].content;
                            ccontacts[actual].visto = true;
                            setContacts(ccontacts);
                            setFilteredContacts(ccontacts);
                            setUpdate(!update);
                        })
                    } else {
                        setMessages({
                            user_from: "",
                            user_to: "",
                            messages: []
                        });
                        setUpdate(!update);
                        console.log("Chat vacio!");
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

            deriveKey(JSON.parse(filteredContacts[actual].public_key), secureLocalStorage.getItem("PRIVATE_KEY"))
            .then(function(dk) {
                //setDerivedKey(dk);
                encrypt(msg, dk)
                .then(async (encrypted_msg) => {
                  /* AXIOS */
                    let data = await axios.post(sendMessageRoute, {
                        user_from: id_from.toString(),
                        user_to: actualID.toString(),
                        content: encrypted_msg,
                        timestamp: fecha
                    });

                    /* SOCKET */
                    socket.current.emit("send-msg", {
                        from: id_from.toString(),
                        to: actualID.toString(),
                        msg: encrypted_msg,
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
                        user_from: secureLocalStorage.getItem("USER_ID"),
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
                });
            })
        }
    }

    useEffect(() => {
        function listen() {
            if (socket.current) {
                console.log("ARRIVAL MSG");
                socket.current.on("msg-recieve", (msg) => {
                    let index = -1;
                    for (let i=0; i<contacts.length; i++) {
                        if (contacts[i].id.toString() == msg.from.toString()) index = i;
                    }
                    if (index != -1) {
                        console.log(currentUserId);
                    }
                    
                    deriveKey(JSON.parse(contacts[index].public_key), secureLocalStorage.getItem("PRIVATE_KEY"))
                    .then(function(dk){
                        decrypt(msg.msg, dk)
                        .then(function(decrypted_msg){
                            setArrivalMessage({
                                content: decrypted_msg,
                                user_to: msg.to,
                                user_from: msg.from,
                                timestamp: msg.timestamp,
                            });
                        })
                    })
                });
            }
        }
        listen();
      }, [currentUser]);

    useEffect(() => {
        if (arrivalMessage) {
            if (contacts[actual] && arrivalMessage.user_from == contacts[actual].id) {
                let cMessages = messages;
                cMessages.messages.push(arrivalMessage);
                setMessages(cMessages);
            }

            /* Encontrar el indice del array que tiene como id al usuario del cual llega el mensaje */
            let index = -1;
            for (let i=0; i<contacts.length; i++) {
                if (contacts[i].id == arrivalMessage.user_from) index = i;
            }

            let ccontacts = contacts;
            ccontacts[index].content = arrivalMessage.content;
            setContacts(ccontacts);
            setFilteredContacts(ccontacts);
            // setChange(!change);
            setUpdate(!update);
        }
      }, [arrivalMessage]);

    const LogOut = () => {
        secureLocalStorage.removeItem("USER");
        secureLocalStorage.removeItem("USER_ID");
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
                                    {/* <Contact element={element} me={currentUserId} id={item} actual={actual} change={change} /> */}
                                    <Contact element={element} id={item} actual={actual} />
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