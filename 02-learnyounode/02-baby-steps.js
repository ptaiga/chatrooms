// console.log(process.argv);
var sum = 0;
for (let i = 2; i < process.argv.length; i++) {
  sum += Number(process.argv[i]);
}
console.log(sum);

// Alternative variant from mentor (Anton) of nodeschool:
// let arr = ['1','2','3'];
// console.log(arr.reduce((sum, item) => sum + +item, 0));