var app = require('express')();
var server = require('http').createServer(app).listen(3000);
var io = require('socket.io').listen(server);
var fs = require('fs');
//var JsonSocket = require('json-socket');
var clients = [];
var is_client = 0;

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/socket.html');
});

/*
io.sockets.on('connect', function(client) {
    clients.push(client); 

    client.on('disconnect', function() {
        clients.splice(clients.indexOf(client), 1);
    });
});

io.sockets.on('connection', function(socket) {
    socket.on('ready', function() {
        // UPDATE N rows with client_id in column checkout.
        // Then SELECTS * from table where checkout = client_id
        clients.forEach(function(client, index) {
            var client_id = index; // Just use the index in the clients array for now
			console.log('Connected user is:', client_id);
            getListings(client_id, function(listings) {
                socket.emit('info', listings);   // send jobs
            });
        });
    });
});
*/
io.sockets.on('connection', function (socket) {
	clients.push(socket);
	for (i=0; i<clients.length; i++) {
		if(clients[i] == socket) 
		{
			console.log('Debug:', clients.length, socket.id);
		}
	//	if (is_client == 0) { clients.push(socket);}
	//	is_client = 0;

	}
    console.log('Connected user is:', clients.length);
    socket.emit('info', { msg: Math.floor((Math.random() * 100) + 1 )});

});
