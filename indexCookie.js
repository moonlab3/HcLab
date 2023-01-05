const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

const http = require('http');
const { stringify } = require('querystring');
const server = http.createServer(app);

const port = 3002;

app.use(cookieParser());

app.get('/getCookie', (req, res) => {
  console.log('req.cookie:' + JSON.stringify(req.cookies));
});
app.get('/', (req, res) => {
  console.log('header:'+ JSON.stringify(req.headers));
  res.cookie('cookieOne', 'minkyu');
  res.sendFile(__dirname + '/indexCookie.html');
});

server.listen(port, function (req, res) {
  var temp = [2,'3',"BootNotification",{"chargePointSerialNumber":"CPG","chargePointVendor":"Matth","chargePointModel":"Ghost 1","chargeBoxSerialNumber":"CPG01","firmwareVersion":"1.0.0"}]
  console.log(JSON.stringify(temp));
  /*
  res.writeHead(200, {
    'Set-Cookie':['cookieOne = minkyu', 'cookieTwo = hotaek']
  });
  */
  console.log(`listening on ${port}`);
  //console.log('header:'+JSON.stringify(req.headers));
});