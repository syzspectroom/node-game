var cfg = {
    scr: {w: 800,
          h: 600
    }
}

var selfId;
var ships = [];
var renderer,
    stage;
var currentKeyFrame,
    frameBuffer = [];

var showKeyFrame;


function start() {
    renderer = new PIXI.autoDetectRenderer(cfg.scr.w, cfg.scr.h);
    document.body.appendChild(renderer.view);
    stage = new PIXI.Stage;

    var background = PIXI.Sprite.fromImage("/images/bg.png");
    stage.addChild(background);
}

function addPlayer(playerId) {
    var newShip = new FrontendEntity("/images/bunny.png");
    ships[playerId] = newShip;
}

function removePlayer(playerId){
    stage.removeChild(ships[playerId].pixiEntity);
    delete ships[playerId];
}

function animate() {
  // setTimeout(function() {
    try{
      for (var key in ships) {
          ships[key].updateWithData(frameBuffer[showKeyFrame][key]);
          showKeyFrame += 1;
          // console.log('frameBuffer length:' + frameBuffer.length);
          // console.log('showKeyFrame:'+ showKeyFrame);
      }
    } catch (e){
      console.log(e.stack);
      console.log('showKeyFrame:'+ showKeyFrame);
    }

    renderer.render(stage);
    requestAnimationFrame(animate);
  // }, 1000 / 30);
}

var isStarted = false;
function addKeyFrame(frameEl){
  frameBuffer[frameEl.frameCounter] = frameEl.frame;
  currentKeyFrame = frameEl.frameCounter;
  showKeyFrame = currentKeyFrame - 24;

  interpolateMoreFrames();

  if (!isStarted) {
    isStarted = true;
    animate();
  }
}

function interpolateMoreFrames(){
  var  = currentKeyFrame - 24;
prevFrame  var

  for(var i = 1; i< 6; i++){

    var curFrame = prevFrame + i;
    var newFrameData = {};

    for (var key in frameBuffer[prevFrame]) {
      var x = frameBuffer[prevFrame][key].position.x + (frameBuffer[currentKeyFrame-18][key].position.x - frameBuffer[prevFrame][key].position.x)/6 * i;
      var y = frameBuffer[prevFrame][key].position.y + (frameBuffer[currentKeyFrame-18][key].position.y - frameBuffer[prevFrame][key].position.y)/6 * i;
      var rotation = frameBuffer[prevFrame][key].rotation + (frameBuffer[currentKeyFrame-18][key].rotation - frameBuffer[prevFrame][key].rotation)/6 * i;

      newFrameData[key] = {position: {x: x, y: y}, rotation: rotation}
    }

    frameBuffer[curFrame] = newFrameData;
    console.log('generated ' + curFrame);
  }


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
        if( typeof data !== "undefined"){
            this.pixiEntity.position = data.position;
            this.pixiEntity.rotation = data.rotation + Math.PI/2;
        }
    }

    return Entity;
})();


KeyboardJS.onPress('w',
    function () {
        playerDo('engineOn');
    },
    function () {
        playerDo('engineOff');
    }
);
KeyboardJS.onPress('a',
    function () {
        playerDo('decAngleVelocity');
    },
    function () {
        playerDo('incAngleVelocity');
    }
);
KeyboardJS.onPress('d',
    function () {
        playerDo('incAngleVelocity');
    },
    function () {
        playerDo('decAngleVelocity');
    }
);


