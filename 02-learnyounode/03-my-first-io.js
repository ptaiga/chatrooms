var fs = require('fs');
var content = fs.readFileSync(process.argv[2], encoding='utf8')
                .split('\n');
console.log(content.length - 1);


// Here's the official solution in case you want to compare notes:

// var fs = require('fs')
// var contents = fs.readFileSync(process.argv[2])
// var lines = contents.toString().split('\n').length - 1
// console.log(lines)

// // note you can avoid the .toString() by passing 'utf8' as the
// // second argument to readFileSync, then you'll get a String!
// //
// // fs.readFileSync(process.argv[2], 'utf8').split('\n').length - 1
