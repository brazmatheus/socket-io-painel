"use strict";
exports.__esModule = true;
var http_1 = require("http");
var socket_io_1 = require("socket.io");
var express = require("express");
var http = require("http");
var app = express();
var httpServer = (0, http_1.createServer)();
var server = http.createServer(app);
var io = new socket_io_1.Server(server);
io.on("connection", function (socket) {
    socket.on("private message", function (anotherSocketId, msg) {
        console.log("anotherSocketId, msg", anotherSocketId, msg);
        socket.to(anotherSocketId).emit("private message", socket.id, msg);
    });
});
io.on('connection', function (socket) {
    console.log('a user connected');
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
    socket.on('chat message', function (msg) {
        io.emit('chat message', msg);
    });
});
io.on('connection', function (socket) {
    socket.broadcast.emit('hi');
});
io.emit('some event', {
    someProperty: 'some value', otherProperty: 'other value'
}); // This will emit the event to all connected sockets
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});
httpServer.listen(3000, function () {
    console.log('listening on *:3000');
});
