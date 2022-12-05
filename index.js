const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

const port = 3000;
var count;
//var socket[];
//var cntSocket;

app.use(express.json());

app.get('/', (req, res) => {
	res.sendFile(__dirname +'/index.html');
});


io.on('connection', (socket) => {

	if(!socket.status) {
		setInterval(() => {
			io.to(socket.id).emit('message', `count:${count++}`);
			console.log(`msg to ${socket.id}`);
		}, 5*1000 , socket);
	}
	else {
		console.log(`not connected :${socket.id}`);
	};

	socket.on('message', (msg) => {
		//io.emit('message', msg);
		io.to(socket.id).emit('message', msg);
		console.log(`id: ${socket.id}, msg:${msg}`);
	});
});

server.listen(3001, () => {
	count = 0;
	//cntSocket = 0;
	console.log('listening on *:3001');
});
