const mymodule = require('./06-make-it-modular-1.js');

const dir = process.argv[2]; //process.cwd();
const ext = process.argv[3];

mymodule(dir, ext, (err, files) => {
  if (err) {
    return console.error('There was an error:', err);
  }

  files.forEach(function (file) {
    console.log(file);
  });

});

// Here's the official solution in case you want to compare notes:
// var filterFn = require('./solution_filter.js')
// var dir = process.argv[2]
// var filterStr = process.argv[3]

// filterFn(dir, filterStr, function (err, list) {
//   if (err) {
//     return console.error('There was an error:', err)
//   }

//   list.forEach(function (file) {
//     console.log(file)
//   })
// })
