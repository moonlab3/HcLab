var WebSocketClient = require('websocket').client;

var client = new WebSocketClient();

client.on('connectFailed', function(error) {
	console.log('Connect Error:' + error.toString());
});

client.on('connect', function(connection) {
	console.log('WebSocket Clinent Connected');
	connection.on('error', function(error) {
		console.log('connenction Error:' + error.toString());
	});
	connection.on('close', function() {
		console.log('HcLab-protocol Connection Closed');
	});
	connection.on('message', function(message) {
		if(message.type === 'utf8') {
			console.log('recved:' + message.utf8Data);
		}
		else {
			console.log('rcved raw data:' + message.data);
		}
	});

	function sendNumber() {
		if(connection.connected) {
			var number = Math.round(Math.random() * 0xFFFFFF);
			//connection.sendUTF(number.toString());
			connection.sendBytes(number.toString());
			//console.log(`status: ${JSON.stringify(connection.readyState)}`);
			setTimeout(sendNumber, 100);
		}
	}
	sendNumber();
});

client.connect('wss://localhost:3001/', 'hclab-protocol');
