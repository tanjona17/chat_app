const express = require("express");
const cors = require("cors");
const app = express();
const http = require("http");
const {Server} = require("socket.io");


const PORT = 1234 || process.env.PORT
app.use(cors());

const server = http.createServer(app);
const io = new Server(server,{
    cors:{
        origin:"http://localhost:5173",
        methods:["GET","POST"]
    }
});

io.on("connect", (socket)=>{
    socket.on("join", (data)=>{
        socket.join(data);   
    });

    socket.on("send_message",(data)=>{
     socket.to(data.room).emit("receive_message",data);
    
    });







    io.on("disconnect", ()=>{
        console.log("disconnected");
    } )
});

server.listen(1234,()=>{
    console.log("server running");
});