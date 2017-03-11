var FPS=60
var clock=0
var hp=100

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

  ctx.fillText("HP: "+hp,90,60);
  ctx.font="18px Arial";
  ctx.fillStyle="blue";
  for(var i=0;i<enemies.length;i++){
    if(enemies[i].hp<=0){
      enemies.splice(i,1);
    }else{
    enemies[i].move();
    ctx.drawImage(enemyImg,enemies[i].x,enemies[i].y);
    };};
    ctx.drawImage(buttonImg,button.x,button.y,64,64);
    if (isBuilding==true){
    ctx.drawImage(cursorImg,cursor.x,cursor.y);
    }else{
    ctx.drawImage(cursorImg,tower.x,tower.y)
    };
    tower.searchEnemy();
    if(tower.aimingEnemyId!=null){
      var id=tower.aimingEnemyId;
      ctx.drawImage(crosshairImg, enemies[id].x, enemies[id].y);
    }
  if(clock%80==0){
    var newEnemy = new Enemy();
    enemies.push(newEnemy);
  };
}


setInterval (draw, 1000/FPS)



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
 cursor.y= event.offsetY
 }

var isBuilding= false

$("#game-canvas").on("click", approve)

function approve (event){
  if (cursor.x>586 && cursor.y>416){
    isBuilding= true;
  }else{
    if(isBuilding==true){
      tower.x=cursor.x-cursor.x%32;
      tower.y=cursor.y-cursor.y%32;
      isBuilding=false
    }
   }
}



var tower={
  x:0,
  y:0,
  range:96,
  aimingEnemyId:null,
  searchEnemy: function(){
    for(i=0;i<enemies.length;i++){
      var dist = Math.sqrt(
        Math.pow(this.x-enemies[i].x,2)+Math.pow(this.y-enemies[i].y,2)
      );
      if (dist<=this.range) {
        this.aimingEnemyId=i;
        return;
      }
    }
    this.aimingEnemyId=null;
  }
};



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
