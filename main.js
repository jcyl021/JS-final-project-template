var bgImg= document.createElement("img");
var enemyImg= document.createElement("img");
var buttonImg= document.createElement("img");
var cursorImg= document.createElement("img");

bgImg.src= "images/map.png";
enemyImg.src= "images/slime.gif";
buttonImg.src= "images/tower-btn.png";
cursorImg.src= "images/tower.png";

var canvas= document.getElementById("game-canvas");
var ctx= canvas.getContext("2d");

function draw (){
  ctx.drawImage(bgImg,0,0);
  ctx.drawImage(enemyImg,enemy.x,enemy.y);
    ctx.drawImage(buttonImg,button.x,button.y,100,100);
    ctx.drawImage(cursorImg,cursor.x,cursor.y)
}

setInterval (draw, 16)

var enemy={
  x:90,
  y:480-32
}
 var button={
   x:540,
   y:380
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
 setInterval (cursorMove, 16)
