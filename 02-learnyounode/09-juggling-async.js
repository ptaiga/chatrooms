const http = require('http');
const urls = process.argv.slice(2,);
let counter = 0;
let responses = [];

urls.forEach((url, index) => {
  // console.log("Url", index, url);
  http.get(url, (res) => {
    res.setEncoding('utf8');
    let rawData = '';
    res.on('data', (chunk) => {
      rawData += chunk;
    });
    res.on('end', () => {
      responses[index] = rawData;
      counter++;
      if (counter === urls.length) {
        responses.forEach((response) => {
          console.log(response);
        });
      }
    });
    res.on('error', console.error);
  }).on('error', console.error);
});

// Here's the official solution in case you want to compare notes:
// var http = require('http')
// var bl = require('bl')
// var results = []
// var count = 0

// function printResults () {
//   for (var i = 0; i < 3; i++) {
//     console.log(results[i])
//   }
// }

// function httpGet (index) {
//   http.get(process.argv[2 + index], function (response) {
//     response.pipe(bl(function (err, data) {
//       if (err) {
//         return console.error(err)
//       }

//       results[index] = data.toString()
//       count++

//       if (count === 3) {
//         printResults()
//       }
//     }))
//   })
// }

// for (var i = 0; i < 3; i++) {
//   httpGet(i)
// }
