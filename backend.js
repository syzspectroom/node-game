players = [];
exports.removePlayer = function(playerId) {
	delete socketClients[this.id];
}

exports.addPlayer = function(playerId) {
	players[playerId] =  
}

exports.engineOn = function(playerId) {
	console.log('engine on');
}
exports.engineOff = function(playerId) {
	console.log('engine off');
}
exports.incAngleVelocity = function(playerId) {
	console.log('incAngleVelocity');
}
exports.decAngleVelocity = function(playerId) {
	console.log('decAngleVelocity');
}
