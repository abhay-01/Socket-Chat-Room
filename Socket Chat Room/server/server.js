console.log("Server is running");

const {instrument} = require("@socket.io/admin-ui");


const io = require('socket.io')(3000 ,{
    cors: {
        origin: ['http://localhost:8080', 'https://admin.socket.io'],
    },
})  // 3000 is the port number that the server will listen to for incoming connections.



io.on("connection", socket=>{
    console.log("new id:",socket.id);
    socket.on("send-message", (message,room)=>{
        console.log(message);

        if(room === ""){
            socket.broadcast.emit("receive-message",message); // what is broadcast? It is a method that sends a message to everyone except the sender.

        }else{
            socket.to(room).emit("receive-message",message); // what is to? It is a method that sends a message to everyone in a room except the sender.
        }
        
    })

    socket.on("join-room", room=>{
        socket.join(room); // what is join? It is a method that allows a socket to join a room.
    })
    
});


instrument(io, { auth: false }) // this is for the admin ui. It is not necessary for the chat app to work.
 