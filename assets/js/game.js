class mainScene {
    preload() {
        // Spritesheet Loading
        this.load.spritesheet("explosion", "assets/img/explosion.png", {
            frameWidth: 16,
            frameHeight: 16
        } );
        this.load.spritesheet("beam", "assets/img/beam.png", {
            frameHeight: 16,
            frameWidth: 16
        } );

        // Audio Loading
        this.load.audio("audio_beam", ["assets/sounds/beam.ogg", "assets/sounds/beam.mp3"]);
        this.load.audio("audio_explosion", ["assets/sounds/explosion.ogg", "assets/sounds/explosion.mp3"]);
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
            key: "beam_anim",
            frames: this.anims.generateFrameNumbers("beam"),
            frameRate: 20,
            repeat: -1
        } );
    }
}

new Phaser.Game( {
    width: 1200,
    height: 700,
    backgroundColor: "#000000",
    scene: mainScene,
    physics: {default: "arcade"},
    parent: "game"
} );