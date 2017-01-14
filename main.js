var enemyImg= document.createElement("img");
bgImg.src= "images/rukia.png";
var canvas= document.gtElementByld("game-canvas");
var ctx= canvas.getContext("2d");

function draw (){
  ctx.drawImage(enemyImg,0,0)
}

setTimeout (draw, 1000)
