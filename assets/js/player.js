class player {
  //for scene 2

  //within create()
  this.cursorKeys = this.input.keyboard.addKeys({up:Phaser.Input.Keyboard.KeyCodes.W,down:Phaser.Input.Keyboard.KeyCodes.S,left:Phaser.Input.Keyboard.KeyCodes.A,right:Phaser.Input.Keyboard.KeyCodes.D});

//within update()
this.movePlayerManager();

//Below update()
movePlayerManager(){
  if(this.cursorKeys.left.isDown){
    this.player.setVelocityX(-gameSettings.playerSpeed);
  }
  else if (this.cursorKeys.right.isDown){
    this.player.setVelocityX(gameSettings.playerSpeed);
  }else{
    this.player.setVelocityX(0);
  }
 
  if (Phaser.Input.Keyboard.JustDown(this.spacebar)){
    if(this.player.active){
      this.shootBeam();
  }
  }
  

}