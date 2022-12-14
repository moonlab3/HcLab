const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

const http = require('http');
const { stringify } = require('querystring');
const server = http.createServer(app);

const port = 3002;

app.use(cookieParser());

app.get('/checkcookie', (req, res) => {
  if(req.headers.cookie !== undefined) {
    res.sendFile(__dirname + '/redirect.html');
  }
  else {
    res.send('you need cookie');
  }
  console.log('req.cookie:' + JSON.stringify(req.cookies));
});
app.get('/', (req, res) => {
  console.log('header:' + JSON.stringify(req.headers));
  res.cookie('cookieOne', 'minkyu');
  res.sendFile(__dirname + '/indexCookie.html');
});

server.listen(port, function (req, res) {
  console.log(`listening on ${port}`);
});