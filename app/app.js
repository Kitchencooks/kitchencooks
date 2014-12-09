var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

var server = app.listen('3000');
var io = require('socket.io')(server);


// A user connects to the server (opens a socket)
io.sockets.on('connection', function (socket) {

    //function to establish initial connection with server, send back id to client
    socket.on('initiate', function() {
        socket.emit('transmitId', socket.id);
    })
    // socket.send(socket.id)

    socket.on( 'drawCircle', function( data, session ) {
        console.log(session)
        console.log( "session " + session + " drew:");
        console.log( data );
        socket.broadcast.emit( 'drawCircle', data );
    });

    // (2): The server recieves a ping event
    // from the browser on this socket
    socket.on('ping', function ( data ) {
        console.log('socket: server recieves ping (2)');
        // (3): Return a pong event to the browser
        // echoing back the data from the ping event
        socket.emit( 'pong', data );
        console.log('socket: server sends pong (3)');

    });
});

// io.sockets.on('startPath', function (data, id) {

//     socket.on( 'drawCircle', function( data, session ) {
//         console.log('meow')
//         console.log( "session " + session + " drew:");
//         console.log( data );
//         socket.broadcast.emit( 'drawCircle', data );
//     });
//     // (2): The server recieves a ping event
//     // from the browser on this socket
//     socket.on('ping', function ( data ) {

//     console.log('socket: server recieves ping (2)');

//     // (3): Return a pong event to the browser
//     // echoing back the data from the ping event
//     socket.emit( 'pong', data );

//     console.log('socket: server sends pong (3)');

//     });
// });





module.exports = app;
