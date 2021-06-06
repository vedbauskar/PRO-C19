var monkey, monkeyImage;
var ground, jungle, jungleImage;
var banana, bananaImage;
var obstacle, obstacleImage;
var score, gameOver;
var foodGroup, obstacleGroup;

function preload(){
  monkeyImage = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
  
  jungleImage = loadImage("jungle.jpg");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");
  
  
}



function setup() {
  createCanvas(800, 400);
  
  jungle = createSprite(0, 0, 800, 400);
  jungle.addImage("junglebro", jungleImage);
  jungle.x = jungle.width/2;
  jungle.scale = 1.5;
  jungle.velocityX = -4;
  
  monkey = createSprite(50, 320, 10, 10);
  monkey.addAnimation("monkeydude", monkeyImage);
  monkey.scale = 0.1;
  
ground = createSprite(400, 350, 800, 10);
  ground.velocityX = -4;
  ground.x = ground.width/2;
  ground.visible = false;
  
  score = 0;
  foodGroup = new Group();
  obstacleGroup = new Group();
  
  
  
  
}

function draw() {
  background(220);
  
  

  if(jungle.x<100){
    jungle.x = jungle.width/2;
  }
  
  if(ground.x<0){
    ground.x = ground.width/2;
  }
  
  if(foodGroup.isTouching(monkey)){
    foodGroup.destroyEach();
    score = score+2;
    switch(score){
      case 10:monkey.scale = 0.12;
        break;
        case 20:monkey.scale = 0.14;
        break;
        case 30: monkey.scale = 0.16;
        break;
        case 40:monkey.scale = 0.18;
        break;
        default: break;
    }
  }
  
  if(keyDown("space")){
    monkey.velocityY = -12;
  }
  
  monkey.velocityY = monkey.velocityY + 0.8;
  monkey.collide(ground);
  
  spawnfood();
  spawnobstacle();
  
  if(obstacleGroup.isTouching(monkey)){
    monkey.scale = 0.08;
    
  }
  drawSprites();
  stroke("white");
  fill("white");
  textSize(20);
  text("score:" + score, 500, 50);
}

function spawnfood(){
  if(frameCount%80 === 0){
    var banana = createSprite(600, 250,40, 10);
    banana.addImage("banana", bananaImage);
    banana.scale = 0.05;
    banana.y = random(120, 200);
    banana.velocityX = -5;
    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;
    foodGroup.add(banana);
  }
}

function spawnobstacle(){
  if(frameCount%300 === 0){
    var obstacle = createSprite(800, 350, 10, 40);
    obstacle.addImage("obstacle", obstacleImage);
    obstacle.scale = 0.2;
    obstacle.velocityX = -6;
    obstacle.lifetime = 300;
    obstacleGroup.add(obstacle);
  }
}