const fs = require('fs');
const http = require('http');
const server = http.createServer((req, res) => {
    src = fs.createReadStream(process.argv[3]);
    src.pipe(res);
});
server.listen(process.argv[2]);

// Here's the official solution in case you want to compare notes:

// var http = require('http')
// var fs = require('fs')

// var server = http.createServer(function (req, res) {
//   res.writeHead(200, { 'content-type': 'text/plain' })

//   fs.createReadStream(process.argv[3]).pipe(res)
// })

// server.listen(Number(process.argv[2]))