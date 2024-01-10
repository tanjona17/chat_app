
import {React,useState,useEffect} from 'react'

import"/public/assets/bootstrap/css/bootstrap.min.css"
import"/public/assets/bootstrap/js/bootstrap.bundle.min.js"
import"/public/assets/remixicon/remixicon.css"
import io from "socket.io-client"

import './chat.css';
import  ScrollToBottom from 'react-scroll-to-bottom';


const socket = io.connect("http://localhost:1234");

const Chat = ()=>{
   
    const[message, setMessage] = useState("");
    const[all_message, setMessages] = useState([]);

    const params = new URLSearchParams(window.location.search);
    const room = params.get("room");
    const user_name = params.get("user_name");

    useEffect(()=>{
        socket.emit("join",room);
    },[room,user_name]);

    const send_message = async ()=>{
       if (message !=="") {
            const message_data = {
                id:Math.random()*1000,
                room: room,
                name: user_name,
                user_message: message,
                date: new Date(Date.now()).getHours()+":"+new Date(Date.now()).getMinutes()
            }
            await socket.emit("send_message",message_data);
            setMessages((list)=>[...list,message_data]);
            setMessage("");
        }
       };

       useEffect(()=>{
            socket.on("receive_message",(data)=>{
                setMessages((list)=>[...list,data]);
            
            });
       },[socket])


        return(
            <section id='main'>
                <div className='message  '>
                    <div className='message_header'>
                        <h3>{user_name}</h3>
                    </div>
                   
                            <div className='message_body'>
                            <ScrollToBottom className="scroll">
                            {all_message.map((message_user)=>{
                                return <div id={user_name === message_user.name ? "you" : "other"} >
                                   
                                    <div className='message_content'>
                                         <h6 key={message_user.id}>{message_user.user_message}</h6>
                                         <p key={message_user.id}>{message_user.date}</p>
                                    </div>
                             
                                        

                                   
                                </div>
                            })}
                        </ScrollToBottom>
                            </div>
                         
                   
                    <div className='message_footer'>
                        <input type="text" className='form-control' placeholder='Text...' 
                        value={message} 
                        onChange={(event)=>setMessage(event.target.value)}
                        onKeyPress={(event)=> event.key === "Enter" ? send_message() : null}

                        />
                        <button onClick={send_message}  className='ri-send-plane-2-fill'></button>
                    </div>

                </div>

            </section>
        )

}

export default Chat;