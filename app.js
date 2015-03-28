var app = require('express')();
var server = require('http').createServer(app).listen(3000);
var io = require('socket.io').listen(server);
var fs = require('fs');
var request = require("request")
var parsedJSON = require('./city.json');		//városok és ID-k vannak benne
var JSONstring;									//a kiválasztott városról lekérdezett adatok vannak benne
var clients = [];
var is_client = 0;
var temperatures = [];



var city_id;

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/socket.html');
});




io.sockets.on('connection', function (socket) {
	
	
	clients.push(socket);			//---------------aktív kapcsolatok karbantartásához--------------
	console.log('Connected user is:', clients.length);
	io.sockets.emit('info', { msg: Math.floor((Math.random() * 100) + 1 )});  //------------ezzel tudom az összes socketnek ugyanazt kiküldeni------------
	
	
	/****** ha csak az adott socketnek szeretnem:
	socket.emit('info', { msg: Math.floor((Math.random() * 100) + 1 )});
	*******/
	
	socket.on('getcity', function(data)
	{
		//socket.emit('torefresh', { msg: "reggeli"});
		console.log(data);

		//-------------végignézi a tárolt városok listáját, és a megfelelő város id mezőjét kiválasztja-----------
		for(var i=0; i<parsedJSON.length; i++){
			if (parsedJSON[i].name == data)
				{
					console.log(parsedJSON[i]._id);
					city_id = parsedJSON[i]._id
				}
//				else 	console.log("nincs");		
		}
		
		
		
		var url = "http://api.openweathermap.org/data/2.5/forecast/daily?id=" + city_id;



		request({
			url: url,
			json: true
		}, function (error, response, body) {

			if (!error && response.statusCode === 200) {
			
			
			var t = new Date( body.list[0].dt*1000 );
//			var formatted = t.format("dd.mm.yyyy hh:MM:ss");

				
		       ; // Print the json response
			   JSONstring = JSON.stringify(body);
				   

			}
		})
		
			socket.emit("chartdata", JSONstring);

		
	});
	

	
	
	  socket.on('disconnect', function () {
	  	for (i=0; i<clients.length; i++) {
		if(clients[i].id == socket.id) 
			{
			clients.splice(i,1);				//-----------------kapcsolatot bontott socket törlése a listából--------------------
			}
		}
		io.emit('user disconnected');

	  });
	


});
