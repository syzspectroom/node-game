var cfg = {
    scr: {w: 800,
          h: 600
    }
}

var selfId;
var ships = [];
var renderer,
    stage;

// document.addEventListener('DOMContentLoaded', start, false);

function start() {
    renderer = new PIXI.autoDetectRenderer(cfg.scr.w, cfg.scr.h);
    document.body.appendChild(renderer.view);
    stage = new PIXI.Stage;

    // create a background..
    var background = PIXI.Sprite.fromImage("/images/bg.png");
    // add background to stage..
    stage.addChild(background);

    // addPlayer(playerId);
    requestAnimationFrame(animate);
}

function addPlayer(playerId) {
    var newShip = new FrontendEntity("/images/bunny.png");
    ships[playerId] = newShip;
}

function animate() {
    playerDo('getFrame');
}
function animateFrame(frame) {
    for (var key in ships) {
        ships[key].updateWithData(frame[key]);
    }

    renderer.render(stage);

    requestAnimationFrame(animate);
}


var FrontendEntity = (function () {

    function Entity(img) {
        this.pixiEntityTexture = PIXI.Texture.fromImage(img);
        this.pixiEntity = new PIXI.Sprite(this.pixiEntityTexture);
        this.pixiEntity.anchor = new PIXI.Point(0.5, 0.5);
        this.pixiEntity.scale.x = 3;
        this.pixiEntity.scale.y = 3;

        this.pixiEntity.rotation = 0;
        this.pixiEntity.position.x = 0;
        this.pixiEntity.position.y = 0;

        stage.addChild(this.pixiEntity);
    }

    Entity.prototype.updateWithData = function (data){
        this.pixiEntity.position = data.position;
        this.pixiEntity.rotation = data.rotation + Math.PI/2;
    }

    return Entity;
})();


KeyboardJS.onPress('w',
    function () {
        // ships[selfId].engineOn();
        playerDo('engineOn');
    },
    function () {
        playerDo('engineOff');
        // ships[selfId].engineOff();
    }
);
KeyboardJS.onPress('a',
    function () {
        playerDo('decAngleVelocity');
        // ships[selfId].decAngleVelocity();
    },
    function () {
        // ships[selfId].incAngleVelocity();
        playerDo('incAngleVelocity');
    }
);
KeyboardJS.onPress('d',
    function () {
        playerDo('incAngleVelocity');
        // ships[selfId].incAngleVelocity();
    },
    function () {
        playerDo('decAngleVelocity');
        // ships[selfId].decAngleVelocity();
    }
);


