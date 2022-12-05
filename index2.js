const express = require('express');
const app = express();
const fs = require('fs');

const https = require('https');

var key = fs.readFileSync(__dirname + '/selfsigned.key');
var cert = fs.readFileSync(__dirname + '/selfsigned.crt');

const server = https.createServer({key: key, cert: cert}, app);

var WebSocketServer = require('websocket').server;

wsServer = new WebSocketServer({
	httpServer: server,
	autoAcceptConnections: false
});

wsServer.on('request', function(request){
	var connection = request.accept('hclab-protocol', request.origin);
	console.log((new Date()) + 'connection accepted.');
	connection.on('message', function(message) {
		if(message.type === 'utf8'){
			//console.log('recvd: ' + message.utf8Data + ' from ' + request.origin);
			console.log('recvd: ' + message.utf8Data);
			connection.sendUTF(message.utf8Data);
		}
		else if (message.type === 'binary') {
			console.log('recvd binary' + message.binaryData.length + 'bytes');
			connection.sendBytes(message.binaryData);
		}
	});
	connection.on('close', function(reasonCode, description) {
		console.log((new Date()) + 'peer ' + connection.remoteAddress + ' disconnected.');
	});
});

/*
app.get('/', (req, res) => {
	res.sendFile(__dirname +'/index.html');
});
*/

server.listen(3001, () => {
	count = 0;
	//cntSocket = 0;
	console.log('listening on *:3001');
});
