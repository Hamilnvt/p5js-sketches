// Title: "Balls"
// Created: ven 26 lug 2024, 09:12:19, CEST

var balls = [];
const n = 100;

function setup()
{
  createCanvas(windowWidth, windowHeight);

  for (let i = 0; i < n; i++) {
    let r = random(5, 40);
    let ball = new Ball(random(r, width-r), random(r, height-r), r);
    ball.col[3] = 200;
    balls.push(ball);
  }
}

function draw()
{
  background(0);

  for (let b of balls) {
    b.show();
    b.update();
  }
}

var run = true;
function mousePressed()
{
  run = !run;
  run ? loop() : noLoop();
}
