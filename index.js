const express = require('express');
const app = express();
const cors = require("cors");
const http = require('http');
const { Server } = require('socket.io');
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
    cors: true,
    // origin: "http://localhost:5173",
    // methods: ["GET", "POST"],
})


httpServer.listen(port, () => {
    console.log("Video chat is running on port 8000");
});


// Middleware
app.use(cors());
app.use(express.json());


io.on("connection", (socket) =>{
    socket.emit("me", socket.id)



    // disconnect
    socket.on("disconnect", ()=>{
        socket.broadcast.emit("callEnded")
    })
})