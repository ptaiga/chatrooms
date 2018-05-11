const http = require('http');
const url = process.argv[2];

http.get(url, (res) => {
  res.setEncoding('utf8');
  res.on('data', (chunk) => {
    console.log(chunk);
  });
}).on('error', (e) => {
  console.error("Got error:", e);
});

// Here's the official solution in case you want to compare notes:
// var http = require('http')

// http.get(process.argv[2], function (response) {
//   response.setEncoding('utf8')
//   response.on('data', console.log)
//   response.on('error', console.error)
// }).on('error', console.error)
