import React, {useState, useEffect} from "react";
import * as BiIcons from "react-icons/bi";
import * as RiIcons from "react-icons/ri";
import * as IoIcons from "react-icons/io5";
import './ChatPage.scss';
import { Last } from "react-bootstrap/esm/PageItem";


const Contact=(props)=>{
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
    return (
        <div class="container">
            <div class="wrapper">
                <div class="msg">
                    {props.msg}
                </div>
            </div>
        </div>
    )
}

const ChatPage=()=>{
    // const [chat, setChat] = useState();

    React.useEffect(() => {
        setData(
            [
                {
                    user: "usuario1",
                    messages: [["hola", "\"2014-01-01T23:28:56.782Z\"", "usuario1"], ["como estas", "\"2014-01-01T23:28:56.782Z\"", "usuario1"], ["jelou", "\"2014-01-01T23:28:56.782Z\"", "usuario1"], ["jelou", "\"2014-01-01T23:28:56.782Z\"", "usuario1"], ["jelou", "\"2014-01-01T23:28:56.782Z\"", "usuario1"], ["jelou", "\"2014-01-01T23:28:56.782Z\"", "usuario1"], ["jelou", "\"2014-01-01T23:28:56.782Z\"", "usuario1"], ["jelou", "\"2014-01-01T23:28:56.782Z\"", "usuario1"], ["jelou", "\"2014-01-01T23:28:56.782Z\"", "usuario1"]]
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

    const [data, setData] = React.useState([{
        user: "",
        messages: [["", "", ""]]
    }]);

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
                        console.log(element);
                        return(
                            <React.Fragment key={item}>
                                <Contact name={element.user} msg={element.messages[element.messages.length-1][0]}></Contact>
                            </React.Fragment>
                        )
                    })}
                </div>
                <div className="chat">
                    <div className="chat-msg">
                        {data[0].messages.map((element, item) => {
                            return(
                            <React.Fragment key={item}>
                                <Textbox msg={element[0]}></Textbox>
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

                    {/* <Contact name="Jorge" msg="ipsum lorem"/>
                    <Contact name="Luis" msg="ipsum lorem"/>
                    <Contact name="Julisa" msg="ipsum lorem"/>
                    <Contact name="Jorge" msg="ipsum lorem"/>
                    <Contact name="Luis" msg="ipsum lorem"/>
                    <Contact name="Julisa" msg="ipsum lorem"/>
                    <Contact name="Jorge" msg="ipsum lorem"/>
                    <Contact name="Luis" msg="ipsum lorem"/>
                    <Contact name="Julisa" msg="ipsum lorem"/>
                    <Contact name="Jorge" msg="ipsum lorem"/>
                    <Contact name="Luis" msg="ipsum lorem"/>
                    <Contact name="Julisa" msg="ipsum lorem"/> */}


export default ChatPage;