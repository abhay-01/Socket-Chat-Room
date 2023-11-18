console.log("Server is running");

const io = require('socket.io')(3000 ,{
    cors: {
        origin: ['http://localhost:8080'],
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
    
});

