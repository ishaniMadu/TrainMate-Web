#!/usr/bin/env node

/**
* Module dependencies.
*/

var app = require('./app');
var debug = require('debug')('trainmate:server');
var http = require('http');
var socketio = require('socket.io');

/**
* Get port from environment and store in Express.
*/

var port = normalizePort(process.env.PORT || '80');
app.set('port', port);

/**
* Create HTTP server.
*/

var server = http.createServer(app);

app.get('/', function (req, res) {
  res.send('hello world')
})
/**
* Listen on provided port, on all network interfaces.
*/

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

app.get('/', function (req, res) {
  res.send('hello world')
})
//var debug = false;
initSocketIO(server,false);

/**
* Normalize a port into a number, string, or false.
*/

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
* Event listener for HTTP server "error" event.
*/

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
        console.error(bind + ' requires elevated privileges');
        process.exit(1);
        break;
        case 'EADDRINUSE':
        console.error(bind + ' is already in use');
        process.exit(1);
        break;
        default:
        throw error;
    }
}

/**
* Event listener for HTTP server "listening" event.
*/

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
    debug('Listening on ' + bind);
}

var socketServer;

function initSocketIO(httpServer,debug)
{
    socketServer = socketio.listen(httpServer);
    if(debug == false){
        socketServer.set('log level', 1); // socket IO debug off
    }

    socketServer.on('connection', function (socket) {
        console.log('connected');

        socket.on('message', function(data) {
            console.log(data);
            socketServer.emit('updates',data);

        });

    });
}
