const PORT = process.env.PORT || 3000;

const express = require('express');
const app = express();
var cors = require('cors');
app.use(cors());

// Backend logic
const http = require('http').Server(app);
const io = require('socket.io')(http);

io.on('connection', (socket) => {
	socket.on('new location', location => clietSetLocation(socket, location))
	socket.emit('locations', flatLocations());
});
io.on('error', (error) => {
	console.log(error);
});

const locations = {};
var dirty = false;
setInterval(sendLocationsToClients, 500);

function flatLocations() {
	return Object.values(locations);
}

function clietSetLocation(socket, location) {
	locations[socket.id] = location;
	dirty = true;
	socket.emit('locations', flatLocations())
}

function sendLocationsToClients(){
	if (true) {
		dirty = false;
		io.emit('locations', flatLocations());
	}
}

// Frontend logic
app.get('/', (req, res) => {
	res.sendFile(__dirname+'/index_eng.html');
	// res.sendFile(__dirname+'/index_ger.html');
});
app.get('/map.jpg', (req, res) => {
	res.sendFile(__dirname+'/map_world.jpg');
	// es.sendFile(__dirname+'/map_DACH.jpg');
});

app.use(express.static(__dirname+'/node_modules/socket.io/client-dist/'))


// let's go
http.listen(PORT, () => {
  console.log('listening on port: ' + PORT);
});
