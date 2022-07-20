// Falling Platforms

// Main Draw Loop
window.addEventListener("load", draw);

//Array of random platforms
let platforms = [];
for (let i = 1; i <= 10; i++) {
  platforms.push(newRandomPlatform());
}

function newRandomPlatform() {
  return {
    x: randomInt(0, cnv.width),
    y: 0, //top
    r: randomInt(1, 10), //size
    v: 2 * Math.random(),
    color: "rgb(128, 128, 128)",
    w: randomInt(50, 200),
    h: 15,
  };
}

requestAnimationFrame(draw);

function draw() {
  click(); //call continously

  //Fill Canvas
  background("LightBlue");

  for (let i = 0; i < platforms.length; i++) {
    movePlatform(platforms[i]);
    drawPlatform(platforms[i]);
  }

  requestAnimationFrame(draw);
}

function drawPlatform(aPlatform) {
  fill(aPlatform.color);
  rect(aPlatform.x, aPlatform.y, aPlatform.w, aPlatform.h, "fill");
}

function movePlatform(aPlatform) {
  //function given single iteration
  aPlatform.y += aPlatform.v; //speed and direction
  if (aPlatform.y > cnv.height) {
    aPlatform.y = -2;
  }
}

//Remove a random platform every three seconds
setInterval(removePlatform, 3000);

function removePlatform() {
  platforms.splice(randomInt(1, platforms.length), 1);
}

//Helper function
function rect(x, y, w, h, mode) {
  if (mode === "fill") {
    ctx.fillRect(x, y, w, h);
  } else if (mode === "stroke") {
    ctx.strokeRect(x, y, w, h);
  }
}

function fill(color) {
  ctx.fillStyle = color;
}

function background(color) {
  fill(color);
  rect(0, 0, cnv.width, cnv.height, "fill");
}

//Assignment
function click() {
  for (let i = 0; i < platforms.length; i++) {
    if (ptInRectangle(mouseX, mouseY, platforms[i]) && mouseIsPressed) {
      platforms[i].y = -2;
      platforms[i].color = randomRGB();
    }
  }
}
