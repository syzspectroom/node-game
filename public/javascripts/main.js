var socket = io.connect('http://localhost');
$(function() {
	// socket.emit('new_player_connected', { player_name: 'data' });

  socket.on('init_player', function (data) {
    console.log(data);
    start();
    selfId = data.id;
    addPlayer(data.id);
  });

  socket.on('new_player_registered', function(data) {
  	console.log('new player:' + data.id);
    addPlayer(data.id);
  });

  socket.on('player_disconnected', function(data) {
  	console.log('player disconnected:' + data.id);
  });

  socket.on('disconnect', function() {
  	console.log('disconnected');
  });
});

function playerDo(playerFunction){
    socket.emit(playerFunction)
}