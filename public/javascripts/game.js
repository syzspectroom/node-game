var cfg = {
    scr: {w: 300,
        h: 400
    }
}


var ships = [];
var renderer,
    stage;

// document.addEventListener('DOMContentLoaded', start, false);

function start() {
    renderer = new PIXI.autoDetectRenderer(cfg.scr.w, cfg.scr.h);
    document.body.appendChild(renderer.view);
    stage = new PIXI.Stage;

    addPlayer();

    requestAnimationFrame(animate);
}

function addPlayer() {
    var newShip = new Entity({x: Math.random() * 200, y: Math.random() * 200}, "/images/bunny.png");
    ships.push(newShip);
}

function animate() {

    for (var key in ships) {
        ships[key].update();
    }

    renderer.render(stage);

    requestAnimationFrame(animate);
}


var Entity = (function () {

    function Entity(pos, img) {
        this.pos = pos;
        this.vel = {x: 0, y: 0};

        this.angle = Math.random() * 6;
        this.angle_vel = 0;
        this.angle_koef = 0.05

        this.spd_coef = 0.1;
        this.lubricous = 0.99 // = 1 - friction

        this.thrust = false;

        this.pixiEntityTexture = PIXI.Texture.fromImage(img);
        this.pixiEntity = new PIXI.Sprite(this.pixiEntityTexture);
        this.pixiEntity.scale.x = 1;
        this.pixiEntity.scale.y = 1;

        this.serializeWithPixi();

        stage.addChild(this.pixiEntity);
    }

    Entity.prototype.serializeWithPixi = function () {
        this.pixiEntity.rotation = this.angle;
//        + Math.PI/2;
        this.pixiEntity.position.x = this.pos.x;
        this.pixiEntity.position.y = this.pos.y;
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

        this.serializeWithPixi();
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


KeyboardJS.onPress('w',
    function () {
        ships[0].engineOn();
    },
    function () {
        ships[0].engineOff();
    }
);
KeyboardJS.onPress('a',
    function () {
        ships[0].decAngleVelocity();
    },
    function () {
        ships[0].incAngleVelocity();
    }
);
KeyboardJS.onPress('d',
    function () {
        ships[0].incAngleVelocity();
    },
    function () {
        ships[0].decAngleVelocity();
    }
);