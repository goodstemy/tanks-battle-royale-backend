const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

let players = {}

io.on('connection', socket => {
	console.log(`${socket.id} connected`)
	players[socket.id] = {
		rotation: 0,
		x: Math.floor(Math.random() * 200) + 50,
		y: Math.floor(Math.random() * 200) + 50,
		playerId: socket.id
	}

	socket.emit('currentPlayers', players)
	socket.broadcast.emit('newPlayer', players[socket.id])

	socket.on('disconnect', () => {
		console.log(`${socket.id} user disconnected`)
		delete players[socket.id]
		io.emit('disconnect', socket.id)
	})

	socket.on('playerMovement', function(movementData) {
		players[socket.id].x = movementData.x
		players[socket.id].y = movementData.y
		players[socket.id].rotation = movementData.rotation

		socket.broadcast.emit('playerMoved', players[socket.id])
	})
})

http.listen(3000, function() {
	console.log('listening on *:3000')
})
