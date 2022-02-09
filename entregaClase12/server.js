const express = require("express");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

io.on('connection', function(socket) {
    console.log('Un cliente se ha conectado');
    socket.emit('messages', messages);
});

/* const socket = io.connect();
socket.on('messages', data => {
    console.log(data);
}); */

httpServer.listen(8080)
app.use('/static', express.static('public'))
app.use(express.static('public'))