const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const fs = require('fs');
const { stringify } = require('querystring');

const port = 3002;

const https = require('https');
const options = {
  key: fs.readFileSync(__dirname + '/selfsigned.key'),
  cert: fs.readFileSync(__dirname + '/selfsigned.crt')
}
const server = https.createServer(options, app) ;

server.listen(port, () => {
  console.log(`listening on ${port}`);
});

app.use(cookieParser());
app.use(express.json());

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
