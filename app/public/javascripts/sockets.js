// Connect to the Node.js Server
$( document ).ready(function() {
  var sessionid;
  io = io.connect('/');
  io.emit('initiate')
  io.on('transmitId', function(sessionid) {
    sessionid = sessionid;
  });

  // console.log("this is the object")
  // console.log(io.io.engine)
  // console.log("this is the hostname")
  // console.log(io.io.engine.hostname)
  // console.log("this should be the ID")
  // console.log(io.io.engine.id)

  // (1): Send a ping event with
  // some data to the server
  // console.log( "socket: browser says ping (1)" )
  // io.emit('ping', { some: 'data' } );

  // // (4): When the browser receives a pong event
  // // console log a message and the events data
  // io.on('pong', function (data) {
  //     console.log( 'socket: browser receives pong (4)', data );
  // });
});