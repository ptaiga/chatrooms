var socketio = require('socket.io');
var io;
var guestNumber = 1;
var nickNames = {};
var namesUsed = [];
var currentRoom = {};

exports.listen = function(server) {
    // Запуск Socket.IO-сервера, чтобы выполняться вместе
    // с существующим HTTP-сервером
    io = socketio.listen(server);
    io.set('log level', 1);
    // Определение способа обработки каждого 
    // пользовательского соединения
    io.sockets.on('connection', function (socket) {
        // Присваивание подключившемуся пользователю имени guest
        guestNumber = assignGuestName(socket, guestNumber, 
            nickNames, namesUsed);
        // Помещение подключившегося пользователя в комнату Lobby
        joinRoom(socket, 'Lobby');
        // Обработка пользовательских сообщений, попыток изменения
        // имени и попыток создания/изменения комнат
        handleMessageBroadcasting(socket, nickNames);
        handleNameChangeAttempts(socket, nickNames, namesUsed);
        handleRoomJoining(socket);
        // Вывод списка занятых комнат по запросу пользователя
        socket.on('rooms', function() {
            socket.emit('rooms', io.sockets.manager.rooms);
        });
        // Определение логики очистки, выполняемой после выхода
        // пользователя из чата
        handleClientDisconnection(socket, nickNames, namesUsed);
    });
};

function assignGuestName(socket, guestNumber, nickNames, namesUsed) {
    // Создание нового гостевого имени
    var name = 'Guest' + guestNumber;
    // Связывание гостевого имени с 
    // идентификатором клиентского подключения
    nickNames[socket.id] = name;
    // Сообщение пользователю его гостевого имени
    socket.emit('nameResult', {
        success: true, 
        name: name
    });
    // Обратите внимение, что гостевое имя уже используется
    namesUsed.push(name);
    // Для генерирования гостевых имен применяется
    // счетчик с приращением
    return guestNumber + 1;
}