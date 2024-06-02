'use strict';
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Voice Chat Server is running');
});

io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('join', (room) => {
        socket.join(room);
        console.log(`Client joined room: ${room}`);
    });

    socket.on('voice', (data) => {
        const { room, audio } = data;
        socket.to(room).emit('voice', audio);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
