class Scene1 extends Phaser.Scene {
  constructor() {
    super("bootGame");
  }

  preload(){
    this.load.image("background", "assets/img/starfield.png");

    //Image Loading
    this.load.image("enemy1", "assets/img/enemy1.png",{
        frameWidth: 32,
        frameHeight: 32
        });
        
    this.load.image("enemy2", "assets/img/enemy2.png",{
          frameWidth: 32,
          frameHeight: 32
          });
        
    this.load.image("enemy3", "assets/img/enemy3.png",{
            frameWidth: 32,
            frameHeight: 32
            });



    // Spritesheet Loading
    this.load.spritesheet("player", "assets/img/player.png", {
      frameWidth: 17,
      frameHeight: 16
    });

    this.load.spritesheet("explosion", "assets/img/explosion.png", {
        frameWidth: 16,
        frameHeight: 16
    } );

    this.load.spritesheet("beam", "assets/img/beam.png", {
        frameHeight: 16,
        frameWidth: 16
    } );

    this.load.spritesheet("power-up", "assets/img/power-up.png",{
      frameWidth: 16,
      frameHeight: 16
    } );

    // Audio Loading
    this.load.audio("audio_beam", ["assets/sounds/beam.ogg", "assets/sounds/beam.mp3"]);
    this.load.audio("audio_explosion", ["assets/sounds/explosion.ogg", "assets/sounds/explosion.mp3"]);
    this.load.audio("audio_pickup", ["assets/sounds/pickup.ogg", "assets/sounds/pickup.mp3"]);

    //Font loading
    this.load.bitmapFont("pixelFont", "assets/font/font.png", "assets/font/font.xml");

}
  

  create() {


      // Creating Animations
      this.anims.create( {
          key: "explode",
          frames: this.anims.generateFrameNumbers("explosion"),
          frameRate:20,
          repeat: 0,
          hiddenOnComplete: true
      } );
      this.anims.create({
        key:"thrust",
        frames: this.anims.generateFrameNumbers("player"),
        frameRate: 20, 
        repeat: -1
      });
      this.anims.create( {
          key: "beam_anim",
          frames: this.anims.generateFrameNumbers("beam"),
          frameRate: 20,
          repeat: -1
      } );
      this.anims.create( {
          key: "red",
          frames: this.anims.generateFrameNumbers("power-up",{
            start: 0,
            end: 1
          }),
          frameRate: 20,
          repeat: -1
      } );
      this.anims.create( {
          key: "gray",
          frames: this.anims.generateFrameNumbers("power-up",{
            start: 2,
            end: 3
          }),
          frameRate: 20,
          repeat: -1
      } );

      this.add.text(20,20,"Loading game...");
      this.scene.start("playGame");


    }
  }

