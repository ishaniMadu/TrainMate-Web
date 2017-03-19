
var app = require('./app');
var debug = require('debug')('trainmate:server');
var http = require('http');
var bodyParser = require('body-parser');
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

//var debug = false;
initSocketIO(server,false);

var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(bodyParser.json());

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8100');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.post('/', urlencodedParser, function(req, res) {

    var email= req.body.email;
    var password= req.body.password;

    sql.connect(connection).then(function() {
        console.log('opening connection');
        new sql.Request().query("Select * from customers WHERE NAME='"+email+"'").then(function(recordset) {
            console.dir(recordset);
            if(recordset.length>0){
                res.send(recordset);

            }else{

            }
        }).catch(function(error) {

        });
    });

})

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
