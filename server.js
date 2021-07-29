const express = require("express");
const path = require("path");
const http = require("http");
const app = express();
const formatMessage = require("./utils/message");
const socketio = require("socket.io");
const server = http.createServer(app);
const port = process.env.PORT || 3000;
const io = socketio(server);
const chatBot = "Udrio";

// Set static folder
app.use(express.static(path.join(__dirname,"public")))

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/public/index");
})

// Run when client connects
io.on("connection",socket=>{   
    let user = "";
    
    // Getting username from client
    socket.on("username",username=>{
        user = username; 
        

         // welcome current user
            socket.emit("message",formatMessage(chatBot,"Welcome to NotDiscord!"));     
    
    // broadcast when a new user joins    
    socket.broadcast.emit("message",formatMessage(chatBot, `${user} has entered the chat room`));        
    });

     

    // Listen for chat messages from client
    socket.on("chatmessage",message=>{
        io.emit("message",formatMessage(user, message));
    });    

    //runs when user disconnects
    socket.on("disconnect",()=>{   
                   
        io.emit("message",formatMessage(chatBot, `${user} left the chat room`));
    });    
});



server.listen(port,()=>{console.log("Server running on "+port);});