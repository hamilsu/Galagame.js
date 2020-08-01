class mainScene {

}

new Phaser.Game( {
    width: 1200,
    height: 700,
    backgroundColor: "#000000",
    scene: mainScene,
    physics: {default: "arcade"},
    parent: "game"
} );