const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        // origin: "https://task-seven-client.up.railway.app/",
        origin: "*",
        methods: ["GET", "POST"]
    },
});

io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);

    socket.on("join_room", (data) => {
        console.log(data);
        socket.join(data);
    });

    socket.on("send_move", (data) => {
        console.log(data);
        socket.to(data.room).emit("receive_move", data);
    });

    socket.on("send_restart", (data) => {
        console.log(data);
        socket.to(data.room).emit("receive_restart", data);
    });
});

server.listen(PORT, () => {
    console.log("SERVER IS RUNNING");
});
