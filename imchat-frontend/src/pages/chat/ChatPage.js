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
import { host, sendMessageRoute, allUsersRoute, recieveMessageRoute } from "../../utils/APIRoutes";

const Contact = (props) => {
    if (props.id == props.actual) {
        return (
            <div className="user" style={{backgroundColor: "gray"}}>
                <div className="name">
                    {/* {console.log(props.slice[0][0])} */}
                    {props.name}
                </div>
                <div className="last-message">
                    {props.msg}
                </div>
            </div>
        )
    }

    return (
        <div className="user">
            <div className="name">
                {props.name}
            </div>
            <div className="last-message">
                {props.msg}
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
        userFrom: "",
        userTo: "",
        messages: []
    });

    useEffect(() => {
        const scrollToBottom = () => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }) }
        scrollToBottom();
    }, [mymessages, props.actual, props.update]);

    useEffect(() => {
        setMymessages(props.messages);
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

var p = [
    {
        user: "usuario1",
        messages: [["holaaa", "1666710185550", "usuario1"], ["como estas", "1666710185550", "usuario1"], ["jelou", "1666710185550", "usuario0"], ["jelou", "1666710185550", "usuario1"], ["jelou", "1666710185550", "usuario1"], ["jelou", "1666710185550", "usuario0"], ["jelou", "1666710185550", "usuario1"], ["jelou", "1666710185550", "usuario1"], ["jelou", "1666710185550", "usuario1"]]
    },
    {
        user: "usuario2",
        messages: [["buenas", "1666710185550", "usuario2"], ["tas bien?", "1666710185550", "usuario2"]]
    },
    {
        user: "usuario3",
        messages: [["hola", "1666710185550", "usuario3"], ["como estas", "1666710185550", "usuario0"]]
    },
    {
        user: "usuario4",
        messages: [["buenas", "1666710185550", "usuario0"], ["tas bien?", "1666710185550", "usuario0"]]
    },
    {
        user: "usuario5",
        messages: [["buenas", "1666710185550", "usuario5"], ["tas bien?", "1666710185550", "usuario5"]]
    },
    {
        user: "usuario6",
        messages: [["buenas", "1666710185550", "usuario0"], ["tas bien?", "1666710185550", "usuario0"]]
    },
    {
        user: "usuario7",
        messages: [["buenas", "1666710185550", "usuario0"], ["tas bien?", "1666710185550", "usuario0"]]
    },
    {
        user: "usuario8",
        messages: [["buenas", "1666710185550", "usuario8"], ["tas bien?", "1666710185550", "usuario8"]]
    }
];

var m = {
    userFrom: "usuario1",
    userTo: "usuario2",
    messages: [
        {
            content: "hola",
            user_to: 92,
            user_from: 93,
            timestamp: 0
        },
        {
            content: "adios",
            user_to: 93,
            user_from: 92,
            timestamp: 0
        },
        {
            content: "hola de nuevo",
            user_to: 92,
            user_from: 93,
            timestamp: 0
        }
    ]
}

var c = [
    {
        user: "usuario1",
        userID: 1,
        lastMsg: "Hola",
        public_key: "912613bbc9cbb73ef0fcf4c72619a8400c845fbde1b809ceba9b3c3902bb2e3a"
    },
    {
        user: "usuario2",
        userID: 2,
        lastMsg: "Hola2",
        public_key: "912613bbc9cbb73ef0fcf4c72619a8400c845fbde1b809ceba9b3c3902bb2e3a"
    },
    {
        user: "usuario3",
        userID: 3,
        lastMsg: "Hola3",
        public_key: "912613bbc9cbb73ef0fcf4c72619a8400c845fbde1b809ceba9b3c3902bb2e3a"
    },
    {
        user: "usuario4",
        userID: 4,
        lastMsg: "Hola4",
        public_key: "912613bbc9cbb73ef0fcf4c72619a8400c845fbde1b809ceba9b3c3902bb2e3a"
    },
    {
        user: "usuario5",
        userID: 5,
        lastMsg: "Hola5",
        public_key: "912613bbc9cbb73ef0fcf4c72619a8400c845fbde1b809ceba9b3c3902bb2e3a"
    },
    {
        user: "usuario6",
        userID: 6,
        lastMsg: "Hola6",
        public_key: "912613bbc9cbb73ef0fcf4c72619a8400c845fbde1b809ceba9b3c3902bb2e3a"
    },
    {
        user: "usuario7",
        userID: 7,
        lastMsg: "Hola7",
        public_key: "912613bbc9cbb73ef0fcf4c72619a8400c845fbde1b809ceba9b3c3902bb2e3a"
    }
];

const ChatPage = () => {
    const navigate = useNavigate();

    const socket = useRef();

    const [contacts, setContacts] = useState(c);
    const [filteredContacts, setFilteredContacts] = useState(c);

    const [messages, setMessages] = useState(m);
    
    const [update, setUpdate] = useState(0);
    const [actual, setActual] = useState(0);

    const [msg, setMsg] = useState("");
    const [arrivalMessage, setArrivalMessage] = useState(null);

    const [currentUser, setCurrentUser] = useState(undefined);
    const [currentUserId, setCurrentUserId] = useState(undefined);

    useEffect(() => {
        async function foo() {
            if (!localStorage.getItem("USER")) {
                navigate("/login");
            } else {
                setCurrentUser(
                    localStorage.getItem("USER")
                );
                setCurrentUserId(
                    localStorage.getItem("USER_ID")
                );

                /* CONTACTOS */
                let data = await axios.post(allUsersRoute, {
                    userId: localStorage.getItem("USER_ID")
                });

                console.log(data);
            }
        }
        foo();
    }, []);

    useEffect(() => {
        if (currentUser) {
            socket.current = io(host);
            socket.current.emit("add-user", currentUserId);
        }
    }, [currentUser]);

    const handleClick = (i) => {
        setActual(i);
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
                console.log(filteredContacts);
            } 
        }
    }

    const handleClickSubmit = async () => {
        // let msg = await document.getElementById("msg-input").value;

        if (msg != "") {
            let fecha = (new Date()).toISOString();
            let user = "user0";   // cuando haya login, se recupera esta info de la sesión

            let id_from = currentUserId;
        

            /* AXIOS */
            let data = await axios.post(sendMessageRoute, {
                user_from: id_from,
                user_to: "93",
                content: msg,
                timestamp: fecha
            });

            /* SOCKET */
            socket.current.emit("send-msg", {
                from: id_from,
                to: "93",
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
                user_to: actual,
                user_from: localStorage.getItem("USER_ID"),
                timestamp: 0
            });
            setMessages(cmessages);

            /* ACTUALIZAR EL ÚLTIMO MENSAJE EN LOS CONTACTOS */ 
            let ccontacts = contacts;
            ccontacts[actual].lastMsg = msg;
            setContacts(ccontacts);
            setFilteredContacts(ccontacts);

            /* ACTUALIZAR EL RENDER Y LIMPIAR EL INPUT */
            setUpdate(!update);
            setMsg("");
        }
    }

    useEffect(() => {
        function listen() {
            if (socket.current) {
                console.log("ARRIVAL MSG");
                socket.current.on("msg-recieve", (msg) => {
                    // setArrivalMessage({ fromSelf: false, message: msg });
                    setArrivalMessage({
                        content: msg.msg,
                        user_to: msg.to,
                        user_from: msg.from,
                        timestamp: msg.timestamp
                    });
                });
            }
        }
        listen();
      }, [currentUser]);

    useEffect(() => {
        if (arrivalMessage) {
            console.log(arrivalMessage);
            let cMessages = messages;
            cMessages.messages.push(arrivalMessage);
            setMessages(cMessages);
            setUpdate(!update);
            setArrivalMessage(undefined);
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
                                    <Contact name={element.user} msg={element.lastMsg} id={item} actual={actual} />
                                </div>
                            </React.Fragment>
                        )
                    })}
                </div>
                <div className="chat">
                    <ChatMsg actual={actual} update={update} messages={messages} userID={currentUserId} />

                    <div className="text-bar">
                        <input id="msg-input" type="text" placeholder="Escribe un mensaje" value={msg} onChange={(e) => setMsg(e.target.value)} />
                        <div onClick={() => handleClickSubmit()}><IoIcons.IoSend/></div>
                    </div>
                </div>
            </div>
        </div>
    )
    
}


export default ChatPage;