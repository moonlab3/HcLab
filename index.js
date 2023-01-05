const express = require('express');
const app = express();
const server = require('http').createServer(app);
const socketToClient = require('socket.io')(server);
const socketToAppServer = require('socket.io-client')('http://localhost:3002');
const bodyParser = require('body-parser');

const hscanRouter = require('./routes/hscanRouter')(socketToClient);

const port = 3000;

//app.set(bodyParser.json());
//app.set(bodyParser.urlencoded({ extended: false}));

app.use(express.json());
app.use('/hscan', hscanRouter);

app.get('/', (req, res) => {
  console.log('root called');
	res.sendFile(__dirname +'/index.html');
});
let socketArray = [];

socketToClient.on('connection', (socket) => {
 console.log('connected ' + socket.id);
 socketArray.push(socket.id);

	socket.on('msg', (msg) => {
		socketToClient.to(socket.id).emit('message', msg);
    console.log(`id: ${socket.id}, msg:${tMsg.msg}`);
  });
  socket.on('dd', (msg) => {
    var info = msg.info;
    console.log(`info.dd: ${info.dd} info.tt: ${info.tt} id:${msg.id}`);
  })
  socket.on('hscan', (msg) => {
    console.log('hscan ', JSON.stringify(msg));
    var tMsg = {'id': socket.id, 'msg': msg};
    socketToAppServer.emit('hscan', tMsg);
  });

  socket.on('sql', (msg) => {
    var tMsg = {'id': socket.id, 'msg': msg};
    socketToAppServer.emit('sql', tMsg);
    console.log(`api server forwarded '${msg}' to App Server`);
  })

  socket.on('disconnect', () => {
    console.log('disconnected ' + socket.id);
  });
});

socketToAppServer.on('hscan', (msg) =>{
  console.log(`from App Server to client ${JSON.stringify(msg.msg)}`);
  socketToClient.to(socketArray[socketArray.indexOf(msg.id)]).emit('hscan', msg.msg);
  //socketArray[msg.id].emit('hscan', msg.msg);
  //socket[msg.id].emit('hscan', msg.msg);
  // todo socket array for message relay
});

server.listen(port, () => {
	console.log(`listening on *:${port}`);
  socketToAppServer.on('connect', () => {
    console.log('connected to App Server with ' + socketToAppServer.id);
  });
});
