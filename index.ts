import { createServer } from "http";
import { Server } from "socket.io";
import * as express from "express";
import * as http from 'http';
const app = express();
const httpServer = createServer();
const server = http.createServer(app);
const io = new Server(server);

io.on("connection", socket => {
    socket.on("private message", (anotherSocketId, msg) => {
        console.log("anotherSocketId, msg", anotherSocketId, msg)
        socket.to(anotherSocketId).emit("private message", socket.id, msg);
    });
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
});

io.on('connection', (socket) => {
    socket.broadcast.emit('hi');
});

io.emit('some event', { 
    someProperty: 'some value', otherProperty: 'other value' 
}); // This will emit the event to all connected sockets

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

httpServer.listen(3000, () => {
    console.log('listening on *:3000');
});