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

  setInterval(function(){
    io.sockets.emit('newFrame', backend.getFrame());
  }, 1000/10);

  function initPlayerMoves(socket) {
  	socket.on('engineOn', function(){backend.engineOn(socket.id)} );
  	socket.on('engineOff', function(){backend.engineOff(socket.id)}  );
  	socket.on('incAngleVelocity', function(){backend.incAngleVelocity(socket.id)}  );
  	socket.on('decAngleVelocity', function(){backend.decAngleVelocity(socket.id)}  );
    // socket.on('getFrame', function() {

    //   frame = backend.getFrame();
    //   socket.emit('newFrame', frame);
    // });
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
  	socket.emit('init_player', { id: socket.id,
      players: backend.getPlayerIds()
     });
  	  console.log('new player');
  	  for (id in socketClients) {
  	  	socketClients[id].emit('new_player_registered', { id: socket.id });
  	  }
  	  socketClients[socket.id] = socket;
  	  backend.addPlayer(socket.id);
  }

}
