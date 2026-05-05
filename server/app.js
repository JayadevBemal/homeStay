const fun = require('./fun')
const http = require('http');

const server = http.createServer(fun);

server.listen(2001);

