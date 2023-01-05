const http = require('http');
const axios = require('axios');

const HttpHeader = require('http-parser').HttpHeader;

function init() {

  var parser = new HttpHeader();

  var stdin = process.openStdin();
  stdin.on('data', (input) => {
    var url, options;
    console.log('========================');

    if(input == 'quit\n') {
      process.exit();
    }
    else if(input.slice(0, 3) == 'get') {
      url = 'http://127.0.0.1:3000/' + input.slice(4);
      options = {
        data: {
          user: 'skeof',
          pass: 'werwer'
        }
      }
      axios.get(url, options)
      .then(res => {
        console.log(`res.body: ${JSON.stringify(res.data)}`);
        console.log(`res headers: ${JSON.stringify(res.headers)}`);
      }, err => {
        console.log('get error');
      }).then(() => {
        console.log('get end');
      });
    }
    else if(input.slice(0, 3) == 'put') {
      url = 'http://127.0.0.1:3000/' + input.slice(4);
      options = {
          user: 'skeof',
          pass: 'werwer'
      }
      axios.put(url, options)
      .then(res => {
        console.log(`res.body: ${JSON.stringify(res.data)}`);
      }, err => {
        console.log('put error');
      }).then(() => {
        console.log('put end');
      });
    }
    else if(input.slice(0, 4) == 'post') {
      url = 'http://127.0.0.1:3000/' + input.slice(5);
      options = {
          user: 'skeof',
          pass: 'werwer'
      }
      axios.post(url, options)
      .then(res => {
        console.log(`post res.data: ${JSON.stringify(res.data)}`);
      }, err => {
        console.log('post error');
      }).then(() => {
      });
    }
    else if(input.slice(0, 6) == 'delete') {
      url = 'http://127.0.0.1:3000/' + input.slice(7);
      options = {
        data: {
          user: 'skeof',
          pass: 'werwer'
        }
      }
      axios.delete(url, options)
      .then(res => {
        console.log(`delete res.data: ${JSON.stringify(res.data)}`);
      }, err => {
        console.log('delete error');
      }).then(() => {
      });
    }
    else if (input.slice(0, 3) == 'sql') {
      options = {
        host:'http://127.0.0.1',
        port: 3000,
        path:'/' + input.slice(4),
        method: 'GET',
        headers: {
          Accept: 'application/json'
        }
      };
      http.request(options, (res) => {
        if (res.statusCode !== 200) {
          console.log(`not ok from the server. code: ${res.statusCode}`);
        }
        else {
          //console.log(`result: ${JSON.stringify(res)}`);
        }
      });
    }
  });

};



init();
