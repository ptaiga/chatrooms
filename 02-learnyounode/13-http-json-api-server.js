const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
    // console.log(url.parse(req.url, true));
    param = url.parse(req.url, true);
    if (param.pathname == '/api/parsetime') {
        date = new Date(param.query['iso']);
        data = {
            "hour": date.getHours(),
            "minute": date.getMinutes(),
            "second": date.getSeconds()
        };
        data = JSON.stringify(data);
    } else if (param.pathname == '/api/unixtime') {
        date = new Date(param.query['iso']);
        data = {
            "unixtime": date.getTime()
        };
        data = JSON.stringify(data);
    } else {
        data = 'Uncorrect get parameters'
    }
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(data);
});
server.listen(process.argv[2]);

// Here's the official solution in case you want to compare notes:

// var http = require('http')
// var url = require('url')

// function parsetime (time) {
//   return {
//     hour: time.getHours(),
//     minute: time.getMinutes(),
//     second: time.getSeconds()
//   }
// }

// function unixtime (time) {
//   return { unixtime: time.getTime() }
// }

// var server = http.createServer(function (req, res) {
//   var parsedUrl = url.parse(req.url, true)
//   var time = new Date(parsedUrl.query.iso)
//   var result

//   if (/^\/api\/parsetime/.test(req.url)) {
//     result = parsetime(time)
//   } else if (/^\/api\/unixtime/.test(req.url)) {
//     result = unixtime(time)
//   }

//   if (result) {
//     res.writeHead(200, { 'Content-Type': 'application/json' })
//     res.end(JSON.stringify(result))
//   } else {
//     res.writeHead(404)
//     res.end()
//   }
// })
// server.listen(Number(process.argv[2]))
