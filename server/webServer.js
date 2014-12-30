var connect = require('connect');
var serveRequests = require('serve-static');

//1. create server stack
var server = connect();

//2. create FS serving interceptor
server.use(serveRequests('../'));

//3. Server port configure
server.listen(9090);

console.log('Node web server started on port - 9090');


