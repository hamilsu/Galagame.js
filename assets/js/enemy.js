class Enemy extends Phaser.GameObjects.Sprite{
  
constructor(scene,x,y,enemyNumber, rowNumber){
  super(scene,x,y,"enemy"+enemyNumber);
  this.setScale(2);
  const enemyType = enemyNumber;
  let row = rowNumber;
  scene.enemies.add(this);
  scene.add.existing(this);
  this.body.velocity.x = gameSettings.enemySpeed;
  this.body.setCollideWorldBounds(true);
  this.body.onWorldBounds = true;

}


update(scene){
  if(this.body.onWall()){
    scene.timeToFlip = true;
  }
  
  }
}