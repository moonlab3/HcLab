const express = require('express');
const app = express();
const fs = require('fs');

const https = require('https');

var key = fs.readFileSync(__dirname + '/selfsigned.key');
var cert = fs.readFileSync(__dirname + '/selfsigned.crt');

const server = https.createServer({key: key, cert: cert}, app);

var WebSocketServer = require('websocket').server;

const port = 3001;

wsServer = new WebSocketServer({
	httpServer: server,
	autoAcceptConnections: false
});

function test() {
  var idTag = "wkejf928349u23";
  var str = [2, '234', "StopTransaction", {"connectorId":"1", "meterStop":1200, "idTag":idTag}];
  console.log(JSON.stringify(str));
}

test();

wsServer.on('request', function(request){
	var connection = request.accept('hclab-protocol', request.origin);

	function closeConnection() {
		connection.close();
	};

	console.log((new Date()) + 'connection accepted.');
	connection.on('message', function(message) {
		if(message.type === 'utf8'){
			//console.log('recvd: ' + message.utf8Data + ' from ' + request.origin);
			console.log('recvd: ' + message.utf8Data);
			connection.sendUTF(message.utf8Data);
			setTimeout(closeConnection, 1000);
		}
		else if (message.type === 'binary') {
			console.log('recvd binary' + message.binaryData.length + 'bytes');
			connection.sendBytes(message.binaryData);
		}
		else {
			console.log('rcvd data:' + message.data);
			connection.send(message.data);
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

server.listen(port, () => {
	count = 0;
	//cntSocket = 0;
	console.log(`listening on *:${port}`);
});
