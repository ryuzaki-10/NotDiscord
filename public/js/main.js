const chatform = document.getElementById("chat-form");
const chatmessages = document.querySelector(".chat-messages");
const socket = io();

// Get username from URL
const para = window.location.search;
const url = new URLSearchParams(para);
const username = url.get("username");
 

socket.emit("username", username);

// Handling Message from server
socket.on("message",message=>{
    
    outputMessage(message);
// Scrolling to bottom after every message
   chatmessages.scrollTop = chatmessages.scrollHeight;
})

// Message submit
chatform.addEventListener("submit",(event)=>{
    event.preventDefault();

    // Get message text
    const msg = event.target.elements.msg.value;
    
    // reseting text in message box
    event.target.elements.msg.value = "";

    // Emit the message to server
    socket.emit("chatmessage",msg);
});

function outputMessage(message) {
    
    const div = document.createElement("div");
    div.classList.add("message");
    div.innerHTML = `<p class="meta">${message.username}<span> ${message.time}</span></p>
    <p class="text">
        ${message.text}
    </p>`;
    document.querySelector(".chat-messages").appendChild(div);
}