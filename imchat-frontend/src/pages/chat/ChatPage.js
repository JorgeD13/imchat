import React, {useState, useEffect} from "react";
import * as BiIcons from "react-icons/bi";
import * as RiIcons from "react-icons/ri";
import * as IoIcons from "react-icons/io5";
import './ChatPage.scss';
import { Last } from "react-bootstrap/esm/PageItem";
import { getValue } from "@testing-library/user-event/dist/utils";
import { waitFor } from "@testing-library/react";


const Contact=(props)=>{

    /* Obtener  */
    // const [id, setId] = useState(0);

    // useEffect(() => {
    //     setId(props.id);
    // }, []);
    if (props.id == props.actual) {
        return (
            <div className="user" style={{backgroundColor: "gray"}}>
                <div className="name">
                    {console.log(props.slice[0][0])}
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
    return (
        <div className="chat-msg">
            {props.filteredData[props.actual].messages.map((element, item) => {
                return(
                <React.Fragment key={item}>
                    <Textbox msg={element[0]} sender={element[2]} other={props.filteredData[props.actual].user}>

                    </Textbox>
                </React.Fragment>
                )
            })}
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

const ChatPage=()=>{
    // const [chat, setChat] = useState();

    useEffect(() => {
        setData(
            p
        );

        setFilteredData(
            p
        );

    }, []);

    const [data, setData] = useState([{
        user: "",
        messages: [["", "", ""]]
    }]);

    const [filteredData, setFilteredData] = useState([{
        user: "",
        messages: [["", "", ""]]
    }]);

    const [update, setUpdate] = useState(0);

    useEffect(() => {
        setActual(0);
    }, []);

    const [actual, setActual] = useState(0);

    const handleClick = (i) => {
        setActual(i);
    }

    const handleSearch = (e) => {
        // filtar:
        if (e == " ") {
            setFilteredData(data);
        } else {
            const dataToAssign = data.filter(d => d.user.includes(e));
            if (dataToAssign.length != 0) {
                setFilteredData(
                    dataToAssign
                );
            }
        }
    }

    const handleClickSubmit = () => {
        let msg = document.getElementById("msg-input").value;

        if (msg != "") {
            setUpdate(1);
            console.log(actual);
            let fecha = Date.now();
            let user = "user0";   // cuando haya login, se recupera esta info de la sesión
            const cdata = p;
            cdata[actual].messages.push([msg, fecha, user]);
            setData(cdata);
            setFilteredData(data);
            // handleClick(actual);
            setUpdate(0);
        }
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
                    <a>Jorge</a>
                    <div><RiIcons.RiDoorOpenFill /></div>
                </div>
            </div>
            {/* body */}
            <div className="body">
                <div className="contacts">
                    {
                    filteredData.map((element, item) => {
                        // console.log(element);
                        // {console.log(item)}
                        // console.log(data.indexOf(item));
                        return(
                            <React.Fragment key={item}>
                            <div onClick={() => handleClick(item)}>
                                <Contact name={element.user} msg={element.messages[element.messages.length-1][0]} id={item} actual={actual} slice={element.messages.slice(-1)}>
                                
                                </Contact>
                            </div>
                            </React.Fragment>
                        )
                    })}
                </div>
                <div className="chat">
                    <ChatMsg filteredData={filteredData} actual={actual} update={update}>

                    </ChatMsg>
                    <div className="text-bar">
                        <input id="msg-input" type="text" placeholder="Escribe un mensaje" />
                        <div onClick={() => handleClickSubmit()}><IoIcons.IoSend/></div>
                    </div>
                </div>
            </div>
        </div>
    )
    
}


export default ChatPage;