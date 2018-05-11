const fs = require('fs');
const path = require('path');

module.exports = function (dir, ext, callback) {
  fs.readdir(dir, (err, files) => {
    if (err) return callback(err);
    let filtered = [];
    files.forEach((file) => {
      if (path.extname(file) === ('.' + ext)) {
        filtered.push(file);
      }
    });
    callback(null, filtered);
  });
  // console.log(dir, ext);
}

// Here's the official solution in case you want to compare notes:
// var fs = require('fs')
// var path = require('path')

// module.exports = function (dir, filterStr, callback) {
//   fs.readdir(dir, function (err, list) {
//     if (err) {
//       return callback(err)
//     }

//     list = list.filter(function (file) {
//       return path.extname(file) === '.' + filterStr
//     })

//     callback(null, list)
//   })
// }
