//creating variables
var backImage,backgr;
var monkey, monkey_running;
var ground,ground_img;

var FoodGroup, bananaImage;
var obstaclesGroup, obstacle_img;

var gameOver;
var score=0;


function preload(){
  //loading images
  backImage=loadImage("jungle.png");
  monkey_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  

 bananaImage = loadImage("banana.png");
 obstacle_img = loadImage("stone.png"); 
  
}

function setup() {
  createCanvas(800,400);
  
  backgr = createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.velocityX=-3;
  backgr.scale=3;
  backgr.x=backgr.width/2;
  
  ground = createSprite(400,380,1600,10);
  ground.velocityX=-3;
  ground.x=ground.width/2
  ground.visible=false;
  
  monkey = createSprite(100,350,10,10);
  monkey.addAnimation("monkey",monkey_running);
  monkey.scale=0.15;
  
  FoodGroup = createGroup();
  obstaclesGroup = createGroup();
   
}

function draw() {
  background(220);

  if(backgr.x<100){
    backgr.x=backgr.width/2
  }
  
  if(ground.x<100){
    ground.x=ground.width/2
  }
  //console.log(monkey.y);
  if (keyDown("space")&&monkey.y>325){
    monkey.velocityY=-16
      }
  
  monkey.velocityY=monkey.velocityY+0.8;
  monkey.collide(ground);
  
  if(FoodGroup.isTouching(monkey)){
    score = score + 2;
    FoodGroup.destroyEach();
  }
  
  if(obstaclesGroup.isTouching(monkey)){
    monkey.scale = 0.15;
    score = 0;
    obstaclesGroup.destroyEach();
  }
  
  switch(score){
    case 10: monkey.scale = 0.12;
    break;
    case 20: monkey.scale = 0.14;
    break;
    case 30: monkey.scale = 0.16;
    break;
    case 40: monkey.scale = 0.18;
    break;
    default: break; 
  }
  
 spawnBananas();
  spawnObstacles();
  drawSprites();
  stroke("white");
  textSize(20);
  fill("white");
  text("Score : " + score, 500, 50);
}

//making functions
function spawnObstacles() {
  if (frameCount%200===0){
    var rock = createSprite(810,325,10,10);
    rock.addImage(obstacle_img);
    rock.velocityX=-5;
    rock.lifetime=165;
    obstaclesGroup.add(rock);
    rock.scale=0.2;
  }
}

function spawnBananas () {
  if (frameCount%80===0){
    var banana = createSprite(810,125,10,10);
    banana.y=Math.round(random(120, 200));
    banana.addImage(bananaImage);
    banana.velocityX=-5;
    banana.lifetime=165;
    FoodGroup.add(banana);
    banana.scale=0.05;
  }
}  

