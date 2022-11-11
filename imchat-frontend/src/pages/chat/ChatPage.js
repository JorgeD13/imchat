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
import { host, sendMessageRoute } from "../../utils/APIRoutes";

const Contact=(props)=>{

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

const Textbox=(props)=>{
    const me = props.other != props.sender;
    
    if (me) {
        return (
            <div className="container" style={{justifyContent: "flex-end"}} >
                <div className="wrapper-2">
                    <div className="msg">
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
                    {props.msg}
                </div>
            </div>
        </div>
    )
}

const ChatMsg=(props)=>{
    const messagesEndRef = useRef(null);

    const [mymessages, setMymessages] = useState(props.filteredData);
    
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    // useEffect(() => {
    //     sendMsg();
    // }, [mymessages]);

    useEffect(() => {
        scrollToBottom();
    }, [mymessages, props.actual, props.update]);

    useEffect(() => {
        setMymessages(props.filteredData);
    }, [mymessages, props.update]);

    return (
        <div className="chat-msg">
            {mymessages[props.actual].messages.map((element, item) => {
                return(
                <React.Fragment key={item}>
                    <Textbox msg={element[0]} sender={element[2]} other={mymessages[props.actual].user}>

                    </Textbox>
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
            msg,
            ts
        }
    ]
}

var c = [
    {
        user: "usuario1",
        lastMsg: "Hola"
    },
    {
        user: "usuario2",
        lastMsg: "Hola2"
    },
    {
        user: "usuario3",
        lastMsg: "Hola3"
    },
    {
        user: "usuario4",
        lastMsg: "Hola4"
    },
    {
        user: "usuario5",
        lastMsg: "Hola5"
    },
    {
        user: "usuario6",
        lastMsg: "Hola7"
    },
    {
        user: "usuario8",
        lastMsg: "Hola9"
    }
];

const ChatPage=()=>{
    const navigate = useNavigate();

    const socket = useRef();

    const [contacts, setContacts] = useState(c);
    const [filteredContacts, setFilteredContacts] = useState(c);

    const [data, setData] = useState(p);
    const [filteredData, setFilteredData] = useState(p); // cambiar por un diccionario
    
    const [update, setUpdate] = useState(0);
    const [actual, setActual] = useState(0);

    const [msg, setMsg] = useState("");
    const [currentUser, setCurrentUser] = useState(undefined);
    const [currentUserId, setCurrentUserId] = useState(undefined);


    const sendMsg = async () => {
        // sendMessageRoute
        const username = localStorage.getItem("USER");
        const userid = localStorage.getItem("USER_ID");
        // socket.current.emit("send-msg", {
        //     to: 1,
        //     from: userid,
        //     msg,
        // });
    }

    useEffect(() => {
        async function foo() {
            // localStorage.setItem("USER", "hola");
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
        foo();
    }, []);

    useEffect(() => {
        if (currentUser) {
            // socket.current = io(host);
            // socket.current.emit("add-user", currentUserId);
        }
    }, [currentUser]);

    const handleClick = (i) => {
        setActual(i);
    }

    const handleSearch = (e) => {
        // filtar:
        if (e == " ") {
            setFilteredData(data);
            setFilteredContacts(contacts);
        } else {
            const dataToAssign = data.filter(d => d.user.includes(e));
            if (dataToAssign.length != 0) {
                setFilteredData(
                    dataToAssign
                );
            }
            const dataToAssign2 = contacts.filter(d => d.user.includes(e));
            if (dataToAssign2.length != 0) {
                setFilteredContacts(dataToAssign2);
                console.log(filteredContacts);
            }
            
        }
        // console.log(filteredContacts);
    }

    const handleClickSubmit = () => {
        let msg = document.getElementById("msg-input").value;

        if (msg != "") {
            let fecha = Date.now();
            let user = "user0";   // cuando haya login, se recupera esta info de la sesión
            const cdata = p;
            cdata[actual].messages.push([msg, fecha, user]);

            let ccontacts = contacts;
            ccontacts[actual].lastMsg = msg;
            setContacts(ccontacts);
            setFilteredContacts(ccontacts);

            setData(cdata);
            setFilteredData(data);
            setUpdate(!update);
            setMsg("");
        }
    }

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
                    <a>{ localStorage.getItem("USER") }</a>
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
                    <ChatMsg filteredData={filteredData} actual={actual} update={update} />

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