const PORT = process.env.PORT || 3000;

const express = require('express');
const app = express();
var cors = require('cors');
app.use(cors());

// Backend logic
const http = require('http').Server(app);
const io = require('socket.io')(http);

io.on('connection', (socket) => this._connectionEstablished(socket));
io.on('error', (error) => this._onError(error));

// Frontend logic
app.get('/', (req, res) => {
	res.sendFile(__dirname+'/index.html');
});
