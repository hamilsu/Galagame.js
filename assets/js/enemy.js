class Enemy extends Phaser.GameObjects.Sprite{
  
constructor(scene,x,y,enemyNumber, rowNumber){
  super(scene,x,y,"enemy"+enemyNumber);
  const enemyType = enemyNumber;
  let row = rowNumber;
  let momentum = 16;
  scene.add.existing(this);
  scene.enemies.add.(this);
}

update(){

  this.scene.time.DelayedCall(this.scene.waitPeriod,()=>{this.x +=momentum},this);
  if(this.x >= config.width - 32 || this.x <= 32){
    momentum = -momentum;
    this.scene.waitPeriod-=250;
  }
  
  }

}


}


//Stuff to throw into Scene1

preload(){
this.load.image("enemy0", "assets/img/enemy1.png",{
frameWidth: 32,
frameHeight: 32
});

this.load.image("enemy1", "assets/img/enemy2.png",{
  frameWidth: 32,
  frameHeight: 32
  });

  this.load.image("enemy2", "assets/img/enemy3.png",{
    frameWidth: 32,
    frameHeight: 32
    });

}

//Stuff for Scene2
this.enemies = this.add.group();


spawnEnemyBlock(){

  let cursorVerticalPosition = 10;
  let verticalBuffer = 42;
  const rightBoundary = config.width - 32;

  //spawns 1 row of enemy type 3, and 2 rows of the other two types.
  spawnEnemyRow(cursorVerticalPosition,3,5,rightBoundary)
  cursorVerticalPosition +=verticalBuffer;
  spawnEnemyRow(cursorVerticalPosition,2,4,rightBoundary)
  cursorVerticalPosition +=verticalBuffer;
  spawnEnemyRow(cursorVerticalPosition,2,3,rightBoundary)
  cursorVerticalPosition +=verticalBuffer;
  spawnEnemyRow(cursorVerticalPosition,1,2,rightBoundary)
  cursorVerticalPosition +=verticalBuffer;
  spawnEnemyRow(cursorVerticalPosition,1,1,rightBoundary)
  return;
  }



spawnEnemyRow(cursorVerticalPosition,enemyNumber, rowNumber, rightBoundary){
  let cursorHorizontalPosition = 32;
  while(cursorHorizontalPosition < rightBoundary){
    let newEnemy = new Enemy(this,cursorHorizontalPosition,cursorVerticalPosition,enemyNumber,rowNumber);
    cursorHorizontalPosition += 42
  }
  return;
}

//To put within the Scene2 update() statement


for (var i = 0; i < this.enemies.getChildren().length; i++){
  var enemy = this.enemies.getChildren()[i];
  enemy.update();
}
