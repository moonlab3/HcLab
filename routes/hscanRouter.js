const express = require('express');

const HttpHeader = require('http-parser').HttpHeader;

function hscanRouter(io) {
  const router = express.Router();
  var parser = new HttpHeader();

  console.log('--- router called ---');

  io.on('connection', (socket) => {
    console.log('hscanrouter: connected');
    socket.on('hscan', (msg) => {
      console.log('hscanrouter-hscan received: ' + msg);
    });
  });
  router.get('/', (req, res) => {
    if(req == null) {
      console.log('hscan get requested with null');
    }
    else {
      //console.log('hscan get requested with ' + JSON.stringify(parser.parseHeaders(req)));
      console.log('hscan get req body ' + JSON.stringify(req.body));
    }
    res.writeHead(200);
    res.write(JSON.stringify({
      data: 'hello hcLab get'
    }));
    res.end();
  });

  router.put('/', (req, res) => {
    console.log('hscan put requested body ' + JSON.stringify(req.body));
    //console.log('data.user ' + req.body.data.user);
    res.writeHead(200, 'efiwojofw');
    res.write(JSON.stringify({
      data: `hscan put${req.body.pass}`
    }));
    res.end();
  });

  router.post('/', (req, res) => {
    console.log('hscan post requested body ' + JSON.stringify(req.body));
    res.writeHead(200, 'efiwojofw');
    res.write(JSON.stringify({
      data: `hscan post${req.body.id}`
    }));
    res.end();
  });

  router.delete('/', (req, res) => {
    console.log('hscan delete requested body ' + JSON.stringify(req.body));
    res.writeHead(200, 'efiwojofw');
    res.write(JSON.stringify({
      data: `hscan delete${req.body.id}`
    }));
    res.end();
  });

  return router;
}

module.exports = hscanRouter;
