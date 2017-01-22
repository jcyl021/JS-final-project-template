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
var isBuilding= false

$("#game-canvas").on("click", approve)

function approve (event){
  if (cursor.x>540 && cursor.y>380){
    isBuilding= true;
}else{
  isBuilding=false;
}
}


function repeat (){
  if (isBuilding==true){
  ctx.drawImage(cursorImg,cursor.x,cursor.y);
}
setInterval(repeat, 16)


$("#game-canvas").on("click", build)

function build (){
  if (isBuilding==true){
    var position= {
      x:event.offsetX,
      y:event.offsetY
    };
  ctx.drawImage(cursorImg,position.x,position.y);
  isBuilding=false
}
