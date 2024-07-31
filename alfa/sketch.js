// Title: "alfa"
// Created: dom 28 lug 2024, 15:47:38, CEST

let alfa = 255;
let col1 = [0,255,255,alfa];
let col2 = [255,0,255,alfa];
let col3 = [255,255,0,alfa];
let center;
let center1, center2, center3;
const radius = 400;

function setup()
{
  createCanvas(windowWidth, windowHeight);

  center = createVector(width/2, height/2);
  let side = radius/2;
  let h = sqrt(side**2 - (side/2)**2);
  console.log(center, side, h);
  center1 = createVector(center.x, center.y - h/2);
  center2 = createVector(center.x - side/2, center.y + h/2);
  center3 = createVector(center.x + side/2, center.y + h/2);
}

function draw()
{
  background(0);
  noStroke();

  push();
  fill(col1);
  circle(center1.x, center1.y, radius);
  pop();

  push();
  fill(col2);
  circle(center2.x, center2.y, radius);
  pop();

  push();
  fill(col3);
  circle(center3.x, center3.y, radius);
  pop();
}
