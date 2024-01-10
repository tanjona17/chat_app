import {React,useState,useEffect} from 'react'
import ReactDOM from 'react-dom/client'
import {Link} from "react-router-dom"

import"/public/assets/bootstrap/css/bootstrap.min.css"
import"/public/assets/bootstrap/js/bootstrap.bundle.min.js"
import './join.css'



const Join = ()=>{
    const[user_name, setName] = useState("");
    const[room, setRoom] = useState("");
    
    const join = (event)=>{
        if (!user_name || !room) {
            event.preventDefault();
            alert("fill all the inputs");
        }


    }
        return(
            <div id='main'>
                <div className='inputs '>
                    <h1 className='text-center '>Join</h1>
                    <input type="text" className='form-control mt-3' placeholder='User name' onChange={(event) => setName(event.target.value)} />
                    <input type="text" className='form-control mt-3' placeholder='room' onChange={(event) => setRoom(event.target.value)} />
                   <Link to={`/chat?user_name=${user_name}&room=${room}`} className="d-flex justify-content-center" >
                    <button onClick={join} className='btn btn-primary mt-3'>Join</button>    
                   </Link>
                </div>
                
            </div>
        )

}

export default Join;