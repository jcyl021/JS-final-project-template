var enemyImg= document.createElement("img");
bgImg.src= "images/rukia.gif";
var canvas= document.gtElementByld("game-canvas");
var ctx= canvas.getContext("2d");

function draw (){
  ctx.drawImage(enemyImg,enemy.x,enemy.y)
}

setInterval (draw, 16)

var enemy{
  x:90,
  y:480-32
}
