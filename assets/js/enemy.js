class Enemy extends Phaser.GameObjects.Sprite{
  
constructor(scene,x,y,enemyNumber, rowNumber){
  super(scene,x,y,"enemy"+enemyNumber);
  this.setScale(2);
  const enemyType = enemyNumber;
  let row = rowNumber;
  let momentum = 32;
  scene.add.existing(this);
  scene.enemies.add(this);
}

update(){
  //Moves the enemies without physics to replicate the old school feel.
this.scene.time.delayedCall(this.scene.waitPeriod,()=>{this.x +=this.momentum;},this);

  //Changing the direction of the enemies when one of them hits the boundary.
  if(this.x >= config.width - 64 || this.x <= 64)
  {
    this.momentum = -this.momentum;
    this.scene.waitPeriod-=250;
  }
  
  }
}