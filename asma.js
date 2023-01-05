// API Server for Mobile App
const express = require('express');
const app = express();
//const http = require('http');
const server = require('http').createServer(app);
//const { Server } = require('socket.io');
const io = require('socket.io')(server);
var port = 3002;

const mysql = require('mysql');
const sqlConn = mysql.createConnection({
  port:'3306',
  host: '127.0.0.1',
  user: 'root'
});

io.on('connection', (socket) => {
  console.log(`connected from ${socket.id}`);

  socket.on('sql', (msg) => {
    //console.log(`id: ${socket.id}, hscan: ${msg.socket}`);
    console.log(`App Server received: ${JSON.stringify(msg)}`);
    var sql = msg.msg;
    sqlConn.query(sql, (err, res) => {
      if(err) throw err;
      var tMsg = { 'id': msg.id, 'msg': res};
      console.log("App Server query result:" + JSON.stringify(tMsg));
      socket.emit('hscan', tMsg);
    });
  });

  socket.on('hscan', (msg) => {
    //console.log('App Server received hscan msg ' + JSON.stringify(msg.msg));
    var tMsg = { 'id': msg.id, 'msg': msg.msg };
    socket.emit('hscan', tMsg);
  })

});

server.listen(port, () => {
  console.log(`App Server is listening on ${port}`);

  sqlConn.connect((err) => {
    if (err) throw err;
    console.log('sql connected');
  });
});