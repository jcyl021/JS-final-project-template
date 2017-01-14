var bgImg= document.createElement("img")
bgImg.src= "iamges/cannon-ball.png"
var canvas= document.gtElementByld("game-canvas")
var ctx= canvas.getContext("2d")

function draw (){
  ctx.drawImage(bgImg,0,0)
}

setTimeout (draw, 100)
