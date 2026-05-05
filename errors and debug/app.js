const testingSyntax = require('./syntax');

const http = require('http');

const server = http.createServer(testingSyntax);

server.listen(2002);