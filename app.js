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
	
	
	clients.push(socket);			//aktív kapcsolatok karbantartásához
	console.log('Connected user is:', clients.length);
	io.sockets.emit('info', { msg: Math.floor((Math.random() * 100) + 1 )});  //ezzel tudom az összes socketnek ugyanazt kiküldeni
	
	
	/****** ha csak az adott socketnek szeretnem:
	socket.emit('info', { msg: Math.floor((Math.random() * 100) + 1 )});
	*******/
	
	socket.on('getcity', function(data)
	{
		//socket.emit('torefresh', { msg: "reggeli"});
		console.log(data);
	});
	
	  socket.on('disconnect', function () {
	  	for (i=0; i<clients.length; i++) {
		if(clients[i].id == socket.id) 
			{
			clients.splice(i,1);				//kapcsolatot bontott socket törlése a listából
			}
		}
		io.emit('user disconnected');

	  });
	


});
