// import { io } from "socket.io-client";

const joinButton = document.getElementById('join-button');
const sendButton = document.getElementById('send-button');
const messageInput = document.getElementById('message-input');
const roomInput = document.getElementById('room-input');
const form = document.getElementById('form');


const socket = io("http://localhost:3000");

socket.on("connect",()=>{
    displayMessage("You are connected to the server at: "+socket.id);

})

socket.on("receive-message",(message)=>{
    displayMessage(message);
})


form.addEventListener("submit",(e)=>{
    e.preventDefault();

    const message = messageInput.value;
    const room = roomInput.value;

    if(message === "") {
        return;
    }

    displayMessage(message);

    messageInput.value = "";

})

sendButton.addEventListener("click",()=>{
    const message = messageInput.value;
    const room = roomInput.value;

    if(message === ""){
        return;
    }

    displayMessage(message);
    console.log(message);
    socket.emit("send-message",message,room);


    messageInput.value = "";
})

joinButton.addEventListener("click",()=>{
    alert("You are joined the room: "+roomInput.value);
    const room = roomInput.value;
    socket.emit("join-room",room);
})

function displayMessage(message){
    const div = document.createElement('div');
    div.textContent = message;
    document.getElementById('message-container').append(div);
}