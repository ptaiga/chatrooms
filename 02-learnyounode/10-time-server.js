const net = require('net');
const server = net.createServer((socket) => {
    socket.end(now());
})
server.listen(process.argv[2]);

function now() {
    date = new Date()
    year = date.getFullYear();
    month = (date.getMonth() < 9 ? '0' : '') + (date.getMonth() + 1);
    day = date.getDate();
    hour = date.getHours();
    minute = date.getMinutes();
    res = year + "-" + month + "-" + day;
    res += " " + hour + ":" + minute + "\n";
    return res
}

// Here's the official solution in case you want to compare notes:

// var net = require('net')

// function zeroFill (i) {
//   return (i < 10 ? '0' : '') + i
// }

// function now () {
//   var d = new Date()
//   return d.getFullYear() + '-' +
//     zeroFill(d.getMonth() + 1) + '-' +
//     zeroFill(d.getDate()) + ' ' +
//     zeroFill(d.getHours()) + ':' +
//     zeroFill(d.getMinutes())
// }

// var server = net.createServer(function (socket) {
//   socket.end(now() + '\n')
// })

// server.listen(Number(process.argv[2]))
