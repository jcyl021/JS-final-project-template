var FPS=60
var clock=0
var hp=100
var score=0
var coins=300

var bgImg= document.createElement("img");
var enemyImg= document.createElement("img");
var buttonImg= document.createElement("img");
var cursorImg= document.createElement("img");
var crosshairImg= document.createElement("img")

bgImg.src= "images/map.2.png";
enemyImg.src= "images/slime.gif";
buttonImg.src= "images/tower-btn.png";
cursorImg.src= "images/tower.png";
crosshairImg.src="images/crosshair.png";


var canvas= document.getElementById("game-canvas");
var ctx= canvas.getContext("2d");



function draw (){
  clock++;
  ctx.drawImage(bgImg,0,0,640,480);
  ctx.fillText("Score: "+score,90,60);
  ctx.fillText("Coins: "+coins,90,37.5);
  ctx.fillText("HP: "+hp,90,15);
  ctx.font="18px Ariel";
  ctx.fillStyle="pink";
  for(var i=0;i<enemies.length;i++){
    if(enemies[i].hp<=0){
      enemies.splice(i,1);
      score+=10;
      coins+=25;
    }else{
    enemies[i].move();
    ctx.drawImage(enemyImg,enemies[i].x,enemies[i].y);
    };};
    ctx.drawImage(buttonImg,button.x,button.y,64,64);
    if (isBuilding==true){
    ctx.drawImage(cursorImg,cursor.x-cursor.x%32,cursor.y-cursor.y%32);}
    for(var i=0;i<towers.length;i++){
      ctx.drawImage(cursorImg,towers[i].x,towers[i].y);
      towers[i].searchEnemy();
      if(towers[i].aimingEnemyId!=null){
      var id=towers[i].aimingEnemyId;
        ctx.drawImage(crosshairImg, enemies[id].x, enemies[id].y);
      }
    };
    if(clock%80==0){
    var newEnemy = new Enemy();
    enemies.push(newEnemy);
  };
  if(hp==0){
    clearInterval(intervalID);
    ctx.font= "90px Ariel";
    ctx.fillStyle="white";
    ctx.fillText("Good Game",100,200);
    ctx.font= "50px Ariel";
    ctx.fillText("YOU SCORED "+score+" POINTS",40,300);
    hp=0
  };
}


var intervalID = setInterval (draw, 1000/FPS)





function Enemy(){
  this.x=0;
  this.y=32;
  this.hp=10;
  this.pathDes=0;
  this.speedX=0;
  this.speedY=64;
  this.move = function(){
    if(isCollided(
      enemyPath[this.pathDes].x,
      enemyPath[this.pathDes].y,
      this.x,
      this.y,
      64/FPS,
      64/FPS)
    ){
      this.x= enemyPath[this.pathDes].x;
      this.y=enemyPath[this.pathDes].y;
      this.pathDes++;
      if(this.pathDes == enemyPath.length){
        this.hp=0;
        hp-=10;
        return;
      }

      if(enemyPath[this.pathDes].x > this.x){
        this.speedX=64;
        this.speedY=0;
      }else if (enemyPath[this.pathDes].x < this.x) {
        this.speedX=-64;
        this.speedY=0;
      }else if (enemyPath[this.pathDes].y > this.y) {
        this.speedX=0;
        this.speedY=64;
      }else if (enemyPath[this.pathDes].y < this.y) {
        this.speedX=0;
        this.speedY=-64;
      }
    }else{
      this.x=this.x+this.speedX/FPS;
      this.y=this.y+this.speedY/FPS;
      }
    }
}

var enemies= [ ];



var enemyPath=[
  {x:0, y:96},
  {x:96, y:96},
  {x:96, y:224},
  {x:224, y:224},
  {x:224, y:320},
  {x:64, y:320},
  {x:64, y:384},
  {x:352, y:384},
  {x:352, y:256},
  {x:320, y:256},
  {x:320, y:192},
  {x:448, y:192},
  {x:448, y:384},
  {x:512, y:384},
  {x:512, y:128},
  {x:192, y:128},
  {x:192, y:64},
  {x:608, y:64},
  {x:608, y:384},
]

 var button={
   x:640-64,
   y:480-64,
 }

 var cursor={
   x:200,
   y:25
 }



$("#game-canvas").on("mousemove", cursorMove)

function cursorMove(event){
 cursor.x= event.offsetX;
 cursor.y= event.offsetY;
 }

var isBuilding= false

$("#game-canvas").on("click", approve)

function approve (event){
  if (cursor.x>586 && cursor.y>416){
    isBuilding= true;
  }else{
    if(isBuilding==true&& coins>=100){
      var newTower = new Tower();
      newTower.x=cursor.x-cursor.x%32;
      newTower.y=cursor.y-cursor.y%32;
      towers.push(newTower)
      coins-=100;
    }
    isBuilding=false
   }
}



function Tower(){
  this.x=0;
  this.y=0;
  this.range=96;
  this.aimingEnemyId=null;
  this.searchEnemy = function(){
    this.timeLeft-=1/FPS;
    for(i=0;i<enemies.length;i++){
      var dist = Math.sqrt(
        Math.pow(this.x-enemies[i].x,2)+Math.pow(this.y-enemies[i].y,2)
      );
      if (dist<=this.range) {
        this.aimingEnemyId=i;
        if(this.timeLeft<=0){
          this.shoot(i);
          this.timeLeft=this.fireRate;
        }
        return;
      }
    }
    this.aimingEnemyId=null;
  };
  this.shoot = function(id){
    ctx.beginPath();
    ctx.moveTo(this.x+16, this.y+16);
    ctx.lineTo(enemies[id].x+16, enemies[id].y+16);
    enemies[id].hp-=this.damage;
    ctx.strokeStyle="blue";
    ctx.lineWidth=5;
    ctx.stroke();
  };
  this.fireRate=1;
  this.timeLeft=1;
  this.damage=3;
}


var towers=[];


function isCollided (pointX, pointY, selfX, selfY, indctrWidth, indctrHeight){
  if( pointX >= selfX
    && pointX <= selfX + indctrWidth
    && pointY >= selfY
    && pointY <= selfY + indctrHeight
  ){
    return true;
  } else{
    return false;
  }
}
