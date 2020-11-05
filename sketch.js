var bg;
var groundimage,ground;
var marioimage,mario;
var obstacleimage;
var brickimg;
var jumpsound;
var score=0;
var obstaclegroup,brickgroup;
var gamestate="play"
function preload(){
bga=loadImage("bg.png")
groundimage = loadImage("ground2.png")
marioimage=loadAnimation("MARIO1.png","MARIO3.png","MARIO2.png")
mariocollided=loadAnimation("MARIO1.png")
//marioimage=loadAnimation("mario123.png")
obstacleimage=loadAnimation("obstacle1.png","obstacle2.png","obstacle3.png","obstacle4.png")
brickimg=loadImage("coin.png")
jumpsound=loadSound("jump.mp3")
diesound=loadSound("die.mp3")
gameoverimage=loadImage("gameOver.png")
restartimage=loadImage("restart.png")
}
function setup (){
createCanvas(1200,600);


ground=createSprite(600,550,1200,100)
ground.addImage(groundimage)
ground.scale=2.0
ground.x=ground.width/2
ground.velocityX=-7

mario=createSprite(100,300,30,50)
mario.addAnimation("running",marioimage)
mario.addAnimation("collided",mariocollided)
mario.scale=0.17
//mario.debug=true
mario.setCollider("rectangle",0,0,mario.width,mario.height)
obstaclegroup=new Group()
brickgroup=new Group() 

gameover=createSprite(550,275,100,100)
gameover.addImage(gameoverimage)
gameover.visible=false
restart=createSprite(533,335,100,100)
restart.addImage(restartimage)
restart.visible=false
}
function draw(){
background(bga)
if(gamestate==="play"){

if(ground.x<0){
    ground.x=ground.width/2
}

if(touches.length>0||keyDown("space")&&mario.y>400){
    mario.velocityY=-20
    jumpsound.play()
    touches=[]
}
mario.velocityY=mario.velocityY+1

spawnbricks();
spawnobstacles();
if(obstaclegroup.isTouching(mario)){
    console.log("is touching")
    gamestate="end"
}


for(var i=0;i<brickgroup.length;i++){
    if(brickgroup.get(i).isTouching(mario)){
        brickgroup.get(i).remove()
        score=score+5
    }                                               
}
if(obstaclegroup.isTouching(mario)){
    gamestate="end"
    diesound.play()
}
}
else if(gamestate==="end"){
    restart.visible=true;
    gameover.visible=true;
    console.log("hi!")
    ground.velocityX=0
    mario.velocityY=0
    obstaclegroup.setVelocityXEach(0)
   brickgroup.setVelocityXEach(0)
    mario.changeAnimation("collided",mariocollided)
    obstaclegroup.setLifetimeEach(-1)
    brickgroup.setLifetimeEach(-1)
    if(touches.length>0||mousePressedOver(restart)){
        gamestate="play";
        score=0;
        restart.visible=false;
        gameover.visible=false;
        obstaclegroup.destroyEach()
        brickgroup.destroyEach()
        mario.changeAnimation("running",marioimage)
        ground.velocityX=-7
        touches=[]
    }
}
mario.collide(ground)
drawSprites();
fill("black")
textSize(25)
textFont("jokerman")
strokeWeight(0.5)
stroke("red")
text("score:"+score,450,30)

//text("x:"+World.mouseX,100,100)
//text("y:"+World.mouseY,100,150)

}

function spawnobstacles(){
    if(frameCount%100===0){
    var obstacle=createSprite(1100,435,10,10)
    obstacle.velocityX=-7
    obstacle.addAnimation("obstacle",obstacleimage)
    obstaclegroup.add(obstacle)
    obstacle.lifetime=200
    obstacle.scale=1.4
  obstacle.depth=ground.depth;
    ground.depth=ground.depth+1;

    }
}

function spawnbricks(){
    if(frameCount%100===0){
        var brick = createSprite(800,200,10,10)
        brick.velocityX=-4
        brick.y=random(300,400)
        brick.addImage("brickimg",brickimg)
        brick.scale=0.12
        brickgroup.add(brick)
        brick.lifetime=200
    }
}