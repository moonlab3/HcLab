const express = require('express');
const app = express();
const server = require('http').createServer(app);
const socketToClient = require('socket.io')(server);

const mysql = require('mysql');
const sqlConn = mysql.createConnection({
  port:'3306',
  host: '127.0.0.1',
  user: 'root'
});