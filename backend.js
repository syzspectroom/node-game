players = [];
exports.removePlayer = function(playerId) {
	delete socketClients[this.id];
}

exports.addPlayer = function(playerId) {
	players[playerId] =  new Entity({x: Math.random() * 200, y: Math.random() * 200});
}

exports.engineOn = function(playerId) {
  players[playerId].engineOn();
	console.log('engine on');
}
exports.engineOff = function(playerId) {
  players[playerId].engineOff();
	console.log('engine off');
}
exports.incAngleVelocity = function(playerId) {
  players[playerId].incAngleVelocity();
	console.log('incAngleVelocity');
}
exports.decAngleVelocity = function(playerId) {
  players[playerId].decAngleVelocity();
	console.log('decAngleVelocity');
}

exports.getFrame = function() {
  var frame ={};
  for (var key in players) {
    players[key].update();
    frame[key] = players[key].dataForPixi();
  }
  return frame;
}

exports.getPlayerIds = function(){
  var ids =[];
  for (var key in players){
    ids.push(key);
  }
  return ids;
}


var cfg = {
    scr: {w: 800,
          h: 600
    }
}
function angle_to_vector(ang) {
    return {x: Math.cos(ang), y: Math.sin(ang)}
}
var Entity = (function () {

    function Entity(pos) {
        this.pos = pos;
        this.vel = {x: 0, y: 0};

        this.angle = Math.random() * 6;
        this.angle_vel = 0;
        this.angle_koef = 0.05

        this.spd_coef = 0.1;
        this.lubricous = 0.99 // = 1 - friction

        this.thrust = false;
    }

    Entity.prototype.dataForPixi = function () {
        return {position: this.pos, rotation: this.angle}
    };

    Entity.prototype.update = function () {

        this.angle += this.angle_vel

        var forward = angle_to_vector(this.angle);

        if (this.thrust) {
            this.vel.x += forward.x * this.spd_coef;
            this.vel.y += forward.y * this.spd_coef;
        }

        this.vel.x *= this.lubricous;
        this.vel.y *= this.lubricous;

        this.pos.x = (this.pos.x + this.vel.x + cfg.scr.w) % cfg.scr.w;
        this.pos.y = (this.pos.y + this.vel.y + cfg.scr.h) % cfg.scr.h;
    };

    Entity.prototype.incAngleVelocity = function () {
        this.angle_vel += this.angle_koef;
    }
    Entity.prototype.decAngleVelocity = function () {
        this.angle_vel -= this.angle_koef;
    }
    Entity.prototype.engineOn = function () {
        this.thrust = true;
    }
    Entity.prototype.engineOff = function () {
        this.thrust = false;
    }
    return Entity;
})();
