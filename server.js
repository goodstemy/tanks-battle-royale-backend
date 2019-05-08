const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

let players = [];

io.on('connection', socket => {
  console.log(`${socket.id} connected`);

  socket.on('tank info', (info) => {
    info.id = socket.id;
    if (!players.includes(socket.id)) {
      players.push(socket.id);
      socket.broadcast.emit('new player', info);
    }

    io.emit('tanks info', info);
  });

	socket.on('disconnect', () => {
		console.log(`${socket.id} user disconnected`);
		const index = players.indexOf(socket.id);
		players = players.splice(index, index);
	});

});

http.listen(3000, function() {
	console.log('listening on *:3000')
});
