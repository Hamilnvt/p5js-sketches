// Title: "space"
// Created: ven 26 lug 2024, 16:14:03, CEST

//TODO
// - aggiungere UI (velocità [ultra velocità con acc > 7])
// - possibilità di scegliere la velocità a cui andare (e rimanere fissi)

var balls = [];
const n = 200;

function setup()
{
  createCanvas(windowWidth, windowHeight);

  for (let i = 0; i < n; i++) {
    let ball = new Ball(random(width), random(height), random(1, 40));
    balls.push(ball);
  }
  balls.sort((a, b) => a.z - b.z);

}

function draw()
{
  background(0);

  for (let i = balls.length-1; i >= 0; i--) {
    if (balls[i].checkEdgesCollision()) {
      let r = random(2, 35);
      let start = -r;

      balls.splice(i, 1);
      let new_b = new Ball(start, random(height), r);
      balls.push(new_b);
      balls.sort((a, b) => a.z - b.z);
    }

    balls[i].show();
    balls[i].update();
  }

  Accelerate();
}

const c = 0.02;
const upper_limit = 10;
const lower_limit = 0;
function Accelerate()
{
  if (keyIsPressed) {
    if (acc > upper_limit) {
      acc = upper_limit;
    }
    else acc += c;
  }
  else if (acc > lower_limit) acc -= 2*c/3;
  else if (acc < lower_limit+10) acc = lower_limit;

  console.log(acc);
}
