/* Hirav Raval*/

var express = require('express');
var reload = require('reload');
var io = require('socket.io')();
var app = express();
var dataFile = require('./data/data.json');

//app.set('port',process.env.PORT || 3000); // for the development purpose listen to a hardcoded port.
app.set('port',process.env.PORT);
app.set('appData',dataFile);
app.set('view engine','ejs');
app.set('views','./views');

app.locals.siteTitle = "Hirav Raval";
app.locals.allSpeakers = dataFile.speakers;

app.use(express.static('app/public'));
app.use(require('./routes/index'));
app.use(require('./routes/speakers'));
app.use(require('./routes/contactme'));
app.use(require('./routes/api'));
app.use(require('./routes/chat'));

var server = app.listen(process.env.PORT,function(){
	console.log('Listening on port '+ app.get('port'));
});

io.attach(server);
io.on('connection',function(socket){
	console.log('New User Connected');
	socket.on('postMessage',function(data){
		io.emit('updateMessages',data);
	});
});

reload(server,app);
//Basic node server code.
/*var http = require('http');


var myServer= http.createServer(function(request,response){
	response.writeHead(200,{"Content-Type":"text/plain"});
	response.write('Express Node JS Meetups');
	response.end();
});

myServer.listen(3000);*/