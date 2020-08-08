class Scene2 extends Phaser.Scene {
  constructor(){
    super("playGame");
  }

  create(){
    this.background = this.add.tileSprite(0, 0, config.width, config.height, "background");
    this.background.setOrigin(0, 0);

    this.cursorKeys = this.input.keyboard.addKeys(
      {
      up:Phaser.Input.Keyboard.KeyCodes.W,
      down:Phaser.Input.Keyboard.KeyCodes.S,
      left:Phaser.Input.Keyboard.KeyCodes.A,
      right:Phaser.Input.Keyboard.KeyCodes.D
    });
    this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    this.player = this.physics.add.sprite(config.width / 2 - 8, config.height - 64, "player");
    this.player.setScale(2);
    this.player.play("thrust");

    this.player.setCollideWorldBounds(true);

    this.score = 0;

      this.scorelabel = this.add.bitmapText(10, 5, "pixelFont", "SCORE:" , 32);


      this.enemies = this.physics.add.group();


     this.waitPeriod = 2500

      this.spawnEnemyBlock();
     
      this.timeToFlip = false;
      this.alreadyCalled = false;
      this.resetTimer = false;
      this.enemyVelocityReversed = false;
  }

  update(){
    
    this.movePlayerManager();
    
    for (var i = 0; i < this.enemies.getChildren().length; i++){
      var enemy = this.enemies.getChildren()[i];
      enemy.update(this);
    }
    if(this.resetTimer){
      this.alreadyCalled = false;
      this.resetTimer = false;
      this.timeToFlip = false;
    }
    if(this.timeToFlip && !this.alreadyCalled){
      this.reachedBounds()
    }
  }

  

  hitEnemy(projectile, enemy) {

    const explosion = new Explosion(this, enemy.x, enemy.y);

    projectile.destroy();
    
    this.score += 15;

    const scoreFormated = this.zeroPad(this.score, 6);
    this.scoreLabel.text = SCORE  + scoreFormated;
}
  // used for score formatting
  zeroPad(number, size) {
    let stringNumber = String(number);
    while (stringNumber.length < (size || 2)) {
      stringNumber = 0 + stringNumber;
    }
    return stringNumber;
}

// when any ships explode
destroyShip(pointer, gameObject) {
    gameObject.setTexture(explosion);
    gameObject.play(explode);
}

// when the player is hit by the enemy
hurtPlayer(player, enemy) {

    

    if (this.player.alpha < 1) {
        return;
    }

    player.disableBody(true, true);

    this.time.addEvent({
        delay: 1000,
        callback: this.resetPlayer,
        callbackScope: this,
        loop: false
    });
}

// resets the player position
resetPlayer() {
    var x = config.width / 2 - 8;
    var y = config.height + 64;
    this.player.enableBody(true, x, y, true, true);

    this.player.alpha = 0.5;
    const tween = this.tweens.add({
        targets: this.player,
        y: config.height - 64,
        ease: 'Power1',
        duration: 1500,
        repeat: 0,
        onComplete: function () {
        this.player.alpha = 1;
        },
        callbackScope: this
    });
}

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

spawnEnemyRow(cursorVerticalPosition,enemyNumber, rowNumber, rightBoundary){
  let cursorHorizontalPosition = 128;
  while(cursorHorizontalPosition < rightBoundary){
    let newEnemy = new Enemy(this,cursorHorizontalPosition,cursorVerticalPosition,enemyNumber,rowNumber);
    cursorHorizontalPosition += 42
  }
  return;
}

spawnEnemyBlock(){

  let cursorVerticalPosition = 80;
  let verticalBuffer = 80;
  const rightBoundary = config.width - 128;

  //spawns 1 row of enemy type 3, and 2 rows of the other two types.
  this.spawnEnemyRow(cursorVerticalPosition,3,5,rightBoundary);
  cursorVerticalPosition +=verticalBuffer;
  this.spawnEnemyRow(cursorVerticalPosition,2,4,rightBoundary);
  cursorVerticalPosition +=verticalBuffer;
  this.spawnEnemyRow(cursorVerticalPosition,2,3,rightBoundary);
  cursorVerticalPosition +=verticalBuffer;
  this.spawnEnemyRow(cursorVerticalPosition,1,2,rightBoundary);
  cursorVerticalPosition +=verticalBuffer;
  this.spawnEnemyRow(cursorVerticalPosition,1,1,rightBoundary);
  return;
  }
  shootBeam(){
    var beam = new Beam(this);
  }
reachedBounds(){
  this.alreadyCalled = true;
  for (var i = 0; i < this.enemies.getChildren().length; i++){
    let enemy = this.enemies.getChildren()[i];
    enemy.body.setVelocityX(0);
    enemy.body.setVelocityY(gameSettings.enemySpeed/2);
  }
  
  this.time.delayedCall(1000,this.resumeMovement,[],this);
}
resumeMovement(){
  gameSettings.enemySpeed +=10;
  if(this.enemyVelocityReversed){
    for (var i = 0; i < this.enemies.getChildren().length; i++){
      let enemy = this.enemies.getChildren()[i];
      enemy.body.setVelocityY(0);
      enemy.body.setVelocityX(gameSettings.enemySpeed);
    }
    this.enemyVelocityReversed = false;
  }
  else{
    for (var i = 0; i < this.enemies.getChildren().length; i++){
      let enemy = this.enemies.getChildren()[i];
      enemy.body.setVelocityY(0);
      enemy.body.setVelocityX(-gameSettings.enemySpeed);
      }
      this.enemyVelocityReversed = true;
    }
    this.time.delayedCall(2500, ()=>this.resetTimer = true, [], this);
  }
  
}


