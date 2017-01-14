var bglmg= document.createElement("img")
bglmg.src= "iamges/cannon-ball.png"
var canvas= document.gtElementByld("game-canvas")
var ctx= canvas.getContext("2d")

function draw (){
  ctx.drawImage(bglmg,0,0)
}

setTimeout (draw, 100)
