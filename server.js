const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

io.on('connection', function(socket) {
  console.log(`${socket.id} connected`);

  socket.on('tank info', (info) => {
    const {x, y} = info;

    io.emit('tanks info', {
      id: socket.id,
      x, y
    });
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
