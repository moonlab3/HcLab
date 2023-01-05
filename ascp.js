// API Server for Charge Point
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);
var port = 3001;

io.on('connection', (socket) => {
  console.log('connected');

});

server.listen(port, () => {
  console.log(`API Server for ChargePoint is listening on ${port}`);
});