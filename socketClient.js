//const app = require('express')();

const socket = require('socket.io-client')('http://localhost:3000');

function init() {
  var now = new Date();
  console.log(now);
  console.log(now + ' ');
  socket.on('connect', () => {
    console.log('connected to ' + socket.id);
  });

  socket.on('hscan', (msg) => {
    console.log('return with ' + JSON.stringify(msg));
  })

  var stdin = process.openStdin();
  stdin.on('data', (msg) => {
    //console.log(msg.slice(4, -1) + ' 4, - 1');
    //console.log(msg.slice(0, 4 - msg.length) + ' 0, 4-length');
    if(msg == 'quit\n') {
      process.exit();
    }
    else if(msg.slice(0, 3 - msg.length) == 'get') {
      console.log(msg.slice(4, -1) + ' to ' + socket.id);
      socket.emit('hscan', msg.slice(4, -1));
    }
    else if(msg.slice(0, 3 - msg.length) == 'put') {
      console.log(msg.slice(4, -1) + ' to ' + socket.id);
      socket.emit('hscan', msg.slice(4, -1).toString());
    }
    else if(msg.slice(0, 3 - msg.length) == 'sql') {
      console.log(msg.slice(4, -1) + ' query ' + socket.id);
      socket.emit('sql', msg.slice(4, -1).toString());
    }
    else {
      var tmp = {info: {dd:'sfwer', tt:32423, ff:'werwbcvb'}, id:'wersdxcv'};
      console.log('send this ' + JSON.stringify(tmp));
      socket.emit('dd', tmp);
    }
  });

};



init();
