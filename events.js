var io = require('socket.io');
var backend = require('./backend');

var socketClients = [];
exports.setServer = function(server) {
	io = io.listen(server);
}

exports.init = function() {

  io.sockets.on('connection', function (socket) {
  	  
  	initNewPlayer(socket);
  	initPlayerMoves(socket);

  	socket.on('disconnect', playerDisconnected );
  });

  function initPlayerMoves(socket) {
	socket.on('engineOn', backend.engineOn(socket.id) );
	socket.on('engineOff', backend.engineOff(socket.id)  );
	socket.on('incAngleVelocity', backend.incAngleVelocity(socket.id)  );
	socket.on('decAngleVelocity', backend.decAngleVelocity(socket.id)  );  	
  }

  function playerDisconnected() {
  	delete socketClients[this.id];
  	backend.removePlayer(this.id);
  	console.log('player disconected');
	for (id in socketClients) {
	   	socketClients[id].emit('player_disconnected', { id: this.id });
  	}
  }

  function initNewPlayer(socket) {
  	socket.emit('init_player', { id: socket.id });
  	  console.log('new player');
  	  for (id in socketClients) {
  	  	socketClients[id].emit('new_player_registered', { id: socket.id });
  	  }		
  	  socketClients[socket.id] = socket;
  	  backend.addPlayer(socket.id);
  }

}
