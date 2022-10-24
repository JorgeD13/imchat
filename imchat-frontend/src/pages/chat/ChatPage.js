import React, {useState, useEffect} from "react";
import * as BiIcons from "react-icons/bi";
import * as RiIcons from "react-icons/ri";
import * as IoIcons from "react-icons/io5";
import './ChatPage.scss';
import { Last } from "react-bootstrap/esm/PageItem";


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

    const msg_other = {
        
    };

    const msg_me = {

    };
    
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

const ChatPage=()=>{
    // const [chat, setChat] = useState();

    useEffect(() => {
        setData(
            [
                {
                    user: "usuario1",
                    messages: [["holaaa", "\"2014-01-01T23:28:56.782Z\"", "usuario1"], ["como estas", "\"2014-01-01T23:28:56.782Z\"", "usuario1"], ["jelou", "\"2014-01-01T23:28:56.782Z\"", "usuario0"], ["jelou", "\"2014-01-01T23:28:56.782Z\"", "usuario1"], ["jelou", "\"2014-01-01T23:28:56.782Z\"", "usuario1"], ["jelou", "\"2014-01-01T23:28:56.782Z\"", "usuario0"], ["jelou", "\"2014-01-01T23:28:56.782Z\"", "usuario1"], ["jelou", "\"2014-01-01T23:28:56.782Z\"", "usuario1"], ["jelou", "\"2014-01-01T23:28:56.782Z\"", "usuario1"]]
                },
                {
                    user: "usuario2",
                    messages: [["buenas", "\"2014-01-01T23:28:56.782Z\"", "usuario2"], ["tas bien?", "\"2014-01-01T23:28:56.782Z\"", "usuario2"]]
                },
                {
                    user: "usuario3",
                    messages: [["hola", "\"2014-01-01T23:28:56.782Z\"", "usuario3"], ["como estas", "\"2014-01-01T23:28:56.782Z\"", "usuario0"]]
                },
                {
                    user: "usuario4",
                    messages: [["buenas", "\"2014-01-01T23:28:56.782Z\"", "usuario0"], ["tas bien?", "\"2014-01-01T23:28:56.782Z\"", "usuario0"]]
                },
                {
                    user: "usuario5",
                    messages: [["buenas", "\"2014-01-01T23:28:56.782Z\"", "usuario5"], ["tas bien?", "\"2014-01-01T23:28:56.782Z\"", "usuario5"]]
                },
                {
                    user: "usuario6",
                    messages: [["buenas", "\"2014-01-01T23:28:56.782Z\"", "usuario0"], ["tas bien?", "\"2014-01-01T23:28:56.782Z\"", "usuario0"]]
                },
                {
                    user: "usuario7",
                    messages: [["buenas", "\"2014-01-01T23:28:56.782Z\"", "usuario0"], ["tas bien?", "\"2014-01-01T23:28:56.782Z\"", "usuario0"]]
                },
                {
                    user: "usuario8",
                    messages: [["buenas", "\"2014-01-01T23:28:56.782Z\"", "usuario8"], ["tas bien?", "\"2014-01-01T23:28:56.782Z\"", "usuario8"]]
                }
            ]
        );

    }, []);

    const [data, setData] = useState([{
        user: "",
        messages: [["", "", ""]]
    }]);

    useEffect(() => {
        setActual(0);
    }, [])

    const [actual, setActual] = useState(0);

    const handleClick = (i) => {
        setActual(i);
        console.log(i);
    }

    return (
        <div className="chat-page">
            {/* header */}
            <div className="navbar">
                <div className="search">
                    <input type="text" placeholder="Buscar" />
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
                    data.map((element, item) => {
                        // console.log(element);
                        // {console.log(item)}
                        // console.log(data.indexOf(item));
                        return(
                            <React.Fragment key={item}>
                            <div onClick={() => handleClick(item)}>
                                <Contact name={element.user} msg={element.messages[element.messages.length-1][0]} id={item} actual={actual}>
                                
                                </Contact>
                            </div>
                            </React.Fragment>
                        )
                    })}
                </div>
                <div className="chat">
                    <div className="chat-msg">
                        {data[actual].messages.map((element, item) => {
                            return(
                            <React.Fragment key={item}>
                                <Textbox msg={element[0]} sender={element[2]} other={data[actual].user}>

                                </Textbox>
                            </React.Fragment>
                            )
                        })}
                    </div>
                    <div className="text-bar">
                        <input type="text" placeholder="Escribe un mensaje" />
                        <div><IoIcons.IoSend /></div>
                    </div>
                </div>
            </div>
        </div>
    )
    
}


export default ChatPage;