var arr = [];
var len = 50;
var cell_width;

var dists = [];
var max_dist = 0;

var targets = [1];
var results = [];

function setup()
{
  createCanvas(1280, 720);
  background(150);

  cell_width = (width-200)/len;

  let j = 1;
  while (2**j <= len*2) {
    targets.push(2**j);
    j++;
  }
  let k = 1;
  while (10**k <= len*2) {
    targets.push(10**k);
    k++;
  }

  for (let i = 0; i < len; i++) {
    dist = eval_dists(i, targets);
    dists.push(dist);
    prime = is_prime(i);
    arr.push(new Cell(100+i*cell_width, height/2-50, i, dist, prime));

    max_dist = (dists[i] > max_dist && prime) ? dists[i] : max_dist;
  }

  console.log("Results:");
  for (let i = 0; i < len; i++) {
    if (arr[i].dist == max_dist && arr[i].prime) {
      push();
      textAlign(CENTER, BOTTOM);
      textSize(cell_width/1.5);
      text("v", arr[i].pos.x, arr[i].pos.y-50, cell_width);
      pop();
      console.log(arr[i].value);
    }
  }
  
  for (let i = 0; i < len; i++) {
    col = map_to_col(dists[i], min(dists), max(dists));
    arr[i].col = col;
    arr[i].draw();
  }
}

function draw()
{
  noLoop();
}

eval_dists = (value, targets) => {
  result = 0;
  for (let i = 0; i < targets.length; i++) {
    dist = dist_from(value, targets[i]);
    result += dist; 
    console.log(`${value} -> ${targets[i]}: ${dist}`)
  }
  console.log(` ${result}`);
  return result;
}

dist_from = (a, b) => abs(a - b);

map_to_col = (dist, min, max) => {
  val = map(dist, min, max, 0, 255);
  return [0, val, 0, 255];
}

is_prime = (n) => {
  if (n < 2) return false;
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i == 0) return false;
  }
  return true;
}

class Cell {
  constructor(x, y, value, dist, prime)
  {
    this.pos = createVector(x,y);
    this.width = cell_width;
    this.value = value;
    this.dist = dist;
    this.col;
    this.prime = prime;
  }

  draw()
  {
    push();
    textAlign(CENTER, BOTTOM);
    textSize(cell_width/2);
    text(this.value, this.pos.x, this.pos.y-10, cell_width);

    textAlign(CENTER, TOP);
    textSize(cell_width/2);
    text(this.dist, this.pos.x, this.pos.y+this.width+10, this.width);

    fill(this.col);
    rect(this.pos.x, this.pos.y, this.width, this.width);
    pop();
  }
}
