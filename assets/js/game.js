
var gameSettings = {
    playerSpeed: 200
  }

var config = {
    type:Phaser.AUTO,
    width: 1200,
    height: 900,
    backgroundColor: 0x000000,
    scene: [Scene1,Scene2],
    pixelArt: true,
    physics: {
      default: "arcade",
      arcade:{
          debug: false
      }
    }
  }
  window.onload = function(){
  var game = new Phaser.Game(config);
  }