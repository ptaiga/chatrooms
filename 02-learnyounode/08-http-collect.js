const http = require('http');
// const bl = require('bl');

const url = process.argv[2];

// http.get(url, (res) => {
//   res.setEncoding('utf8');
//   res.pipe(bl((err, data) => {
//     console.log(data.length);
//     console.log(data.toString());
//   }));
// });

http.get(url, (res) => {
  res.setEncoding('utf8');
  let rawData = '';
  res.on('data', (chunk) => {
    rawData += chunk;
  });
  res.on('end', () => {
    console.log(rawData.length);
    console.log(rawData);
  });
  res.on('error', console.error);
}).on('error', console.error);

// Here's the official solution in case you want to compare notes:
// var http = require('http')
// var bl = require('bl')

// http.get(process.argv[2], function (response) {
//   response.pipe(bl(function (err, data) {
//     if (err) {
//       return console.error(err)
//     }
//     data = data.toString()
//     console.log(data.length)
//     console.log(data)
//   }))
// })
