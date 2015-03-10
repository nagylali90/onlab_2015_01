var app = require('express')();
var server = require('http').createServer(app).listen(80);
var io = require('socket.io').listen(server);
var fs = require('fs');
var JsonSocket = require('json-socket');


app.get('/', function (req, res) {
  res.sendfile(__dirname + '/socket.html');
});




io.sockets.on('connection', function (socket) {
    console.log('A new user connected!');
    socket.emit('info', { msg: Math.floor((Math.random() * 100) + 1 )});
});
