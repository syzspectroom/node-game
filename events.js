var io = require('socket.io');
var clients = [];
exports.setServer = function(server) {
	io = io.listen(server);
}

exports.init = function() {

  io.sockets.on('connection', function (socket) {
  	  
  	initNewPlayer(socket);

  	socket.on('disconnect', playerDisconnected );

  });

  function playerDisconnected() {
  	delete clients[this.id];
  	console.log('player disconected');
	for (id in clients) {
	   	clients[id].emit('player_disconnected', { id: this.id });
  	}
  }

  function initNewPlayer(socket) {
  	socket.emit('init_player', { id: socket.id });
  	  console.log('new player');
  	  for (id in clients) {
  	  	clients[id].emit('new_player_registered', { id: socket.id });
  	  }		
  	  clients[socket.id] = socket;
  }

}
