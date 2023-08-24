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

const port = process.env.PORT || 8000;

httpServer.listen(port, () => {
    console.log("Video chat is running on port 8000");
});


// Middleware
app.use(cors());
app.use(express.json());


io.on("connection", (socket) => {
    socket.emit("me", socket.id)

    // to call
    socket.on('callUser', (data) => {
        io.to(data.userToCall).emit('callUser', { signal: data.signalData, from: data.from, name: data.name })
    })

    //  to answer call
    socket.io("answerCall", (data) => {
        io.to(data.to).emit("callAccepted", data.signal)
    })

    // disconnect
    socket.on("disconnect", () => {
        socket.broadcast.emit("callEnded")
    })
})