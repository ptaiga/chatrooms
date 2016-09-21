// Встроенный модуль http поддерживает
// функциональность HTTP-сервера и HTTP-клиента
var http = require('http');

// Встроенный модуль fs поддерживает 
// функциональность файловой системы
var fs = require('fs');

// Встроенный модуль path поддерживает
// функциональность, связанную с путями файловой системы
var path = require('path');

// Дополнительный модуль mime поддерживает порождение
// MIME-типов на основе расширения имен файлов
var mime = require('mime');

// Объект cache реализует хранение содержимого 
// кэшированных файлов
var cache = {};

function send404(response) {
    response.writeHead(404, {'Content-Type': 'text/plain'});
    response.write('Error 404: resourse not found.');
    response.end();
}

function sendFile(response, filePath, fileContents) {
    response.writeHead(
        200,
        {"content-type": mime.lookup(path.basename(filePath)) }
    );
    response.end(fileContents);
}

function serveStatic(response, cache, absPath) {
    // Проверка факта кэширования файла в памяти
    if (cache[absPath]) {
        // Обслуживание файла, находящегося в памяти
        sendFile(response, absPath, cache[absPath]);
    } else {
        // Проверка факта существования файла
        fs.exists(absPath, function(exists) {
            if (exists) {
                // Считывание файла с диска
                fs.readFile(absPath, function(err, data) {
                    if (err) {
                        send404(response);
                    } else {
                        cache[absPath] = data;
                        // Обслуживание файла, считанного с диска
                        sendFile(response, absPath, data);
                    }
                });
            } else {
                // Отсылка HTTP-ответа 404
                send404(response);
            }
        });
    }
}

// Создание HTTP-сервера с помощью анонимной функции,
// определяющей его поведение при выполнении запросов
var server = http.createServer(function(request, response) {
    var filePath = false;
    if (request.url == '/') {
        // Определение HTML-файла, обслуживаемого по умолчанию
        filePath = 'public/index.html';
    } else {
        // Преобразование URL-адреса в относительный путь к файлу
        filePath = 'public' + request.url;
    }
    var absPath = './' + filePath;
    // Обслуживание статического файла
    serveStatic(response, cache, absPath);
});

server.listen(3000, function () {
    console.log("Server listening on port 3000");
});

var chatServer = require('./lib/chat_server');
chatServer.listen(server);