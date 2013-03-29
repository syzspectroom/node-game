var socket = io.connect('http://192.168.0.147');
$(function() {
	// socket.emit('new_player_connected', { player_name: 'data' });

  socket.on('init_player', function (data) {
    console.log(data);
    start();
  });

  socket.on('new_player_registered', function(data) {
  	console.log('new player:' + data.id);
  });

  socket.on('player_disconnected', function(data) {
  	console.log('player disconnected:' + data.id);
  });

  socket.on('disconnect', function() {
  	console.log('disconnected');
  });
});