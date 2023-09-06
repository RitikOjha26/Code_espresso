
//const { Socket } = require('dgram');
const express = require('express')
const app = express();
const http = require('http');


const { Server } = require('socket.io');
const ACTIONS = require('./src/Actions');
const server = http.createServer(app);

app.use(express.static('build'));

const userSocketMap = {};

const io = new Server(server);

function getallConnectedClients(roomId) {
    return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(
        (socketId) => {
            return {
                socketId,
                username: userSocketMap[socketId],
            }
        });
}

io.on('connection', (socket) => {
    // socket.on('error', e => console.log(e)); 
    // io.on('error', e => console.log(e));
    console.log('socket connected', socket.id);

    socket.on(ACTIONS.JOIN, ({ roomId, username }) => {
        userSocketMap[socket.id] = username;
        socket.join(roomId);
        const clients = getallConnectedClients(roomId);
        // console.log(clients);

        clients.forEach(({ socketId }) => {
            io.to(socketId).emit(ACTIONS.JOINED, {
                clients,
                username,
                socketId: socket.id,
            });

        });

    });

    socket.on(ACTIONS.CODE_CHANGE, ({ roomId, code }) => {

        socket.in(roomId).emit(ACTIONS.CODE_CHANGE, { code });
    });

    socket.on(ACTIONS.SYNC_CODE, ({ socketId, code }) => {

        io.to(socketId).emit(ACTIONS.CODE_CHANGE, { code });
    });

    socket.on('disconnecting', () => {
        const rooms = [...socket.rooms];
        rooms.forEach((roomId) => {
            socket.in(roomId).emit(ACTIONS.DISCONNECTED, {
                socketId: socket.id,
                username: userSocketMap[socket.id],
            });
        });
        delete userSocketMap[socket.id];
        socket.leave();

    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Listening on port ${PORT}`)); 