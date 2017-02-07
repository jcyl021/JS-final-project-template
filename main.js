var FPS=60

var bgImg= document.createElement("img");
var enemyImg= document.createElement("img");
var buttonImg= document.createElement("img");
var cursorImg= document.createElement("img");


bgImg.src= "images/map.2.png";
enemyImg.src= "images/slime.gif";
buttonImg.src= "images/tower-btn.png";
cursorImg.src= "images/tower.png";


var canvas= document.getElementById("game-canvas");
var ctx= canvas.getContext("2d");


function draw (){
  ctx.drawImage(bgImg,0,0,640,480);
  ctx.drawImage(enemyImg,enemy.x,enemy.y);
  enemy.move();
  ctx.drawImage(buttonImg,button.x,button.y,64,64);
  if (isBuilding==true){
    ctx.drawImage(cursorImg,cursor.x,cursor.y);
  }else{
      ctx.drawImage(cursorImg,tower.x,tower.y)
   }
}
setInterval (draw, 1000/FPS)

var enemy={
  x:0,
  y:32,
  speedX:0,
  speedY:64,
  move:function(){
    this.x=this.x+this.speedX/FPS;
    this.y=this.y+this.speedY/FPS
  }
}

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
      tower.x=cursor.x;
      tower.y=cursor.y
      isBuilding=false
    }
   }
}

var tower={
  x:0,
  y:0
}
