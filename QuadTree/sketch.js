const dim = 600;
let n = 50;
var qtree;

var pointsInRange = [];

function setup()
{
  createCanvas(dim, dim);

  let center = new XY(width/2, height/2);
  let halfDimension = width/2;
  let boundary = new AABB(center, halfDimension);
  qtree = new QuadTree(boundary);

  for (let i = 0; i < n; i++) {
    //TODO c'è un problema, non aggiunge tutti i punti (probabilmente è containsPoint che è sbagliata)
    let point = new XY(random(width), random(height));
    qtree.insert(point);
  }

  //solo ora che è statico TODO
  background(0);

  let range_center = new XY(random(width), random(height));
  let range_halfDimension = random(100, width/2);
  let range = new AABB(range_center, range_halfDimension);
  range.show([150, 40, 100], 2);

  pointsInRange = qtree.queryRange(range);
}

function draw()
{
  qtree.showGrid();
  qtree.showPoints();

  for (let p of pointsInRange) {
    push();
    stroke(150, 40, 100);
    strokeWeight(5);
    point(p.x, p.y);
    pop();
  }
  noLoop();
}
