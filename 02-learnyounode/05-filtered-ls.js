const fs = require('fs');
const path = require('path')
const dir = process.argv[2]; //process.cwd();
const ext = '.' + process.argv[3]

fs.readdir(dir, (err, files) => {
  if (err) throw err;
  files.forEach((file) => {
    if (path.extname(file) === ext) console.log(file);
  });
});