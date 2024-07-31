const QT_NODE_CAPACITY = 4;

class QuadTree {
  constructor(boundary, capacity) 
  {
    this.boundary = boundary;
    this.capacity = QT_NODE_CAPACITY || capacity; 
    this.points = [];

    this.northWest = undefined;
    this.northEast = undefined;
    this.southWest = undefined;
    this.southEast = undefined;
  }

  insert(p)
  {
    if (!this.boundary.containsPoint(p)) return false;

    if (this.points.length < this.capacity && !this.northWest) {
      this.points.push(p);
      return true;
    }

    if (!this.northWest) this.subdivide();
    
    if (this.northWest.insert(p)) return true;
    if (this.northEast.insert(p)) return true;
    if (this.southWest.insert(p)) return true;
    if (this.southEast.insert(p)) return true;

    return false;
  }

  subdivide()
  {
    let new_dim = this.boundary.halfDimension / 2;
    this.northWest = new QuadTree(new AABB(new XY(this.boundary.center.x - new_dim, this.boundary.center.y - new_dim), new_dim));
    this.northEast = new QuadTree(new AABB(new XY(this.boundary.center.x + new_dim, this.boundary.center.y - new_dim), new_dim));
    this.southWest = new QuadTree(new AABB(new XY(this.boundary.center.x - new_dim, this.boundary.center.y + new_dim), new_dim));
    this.southEast = new QuadTree(new AABB(new XY(this.boundary.center.x + new_dim, this.boundary.center.y + new_dim), new_dim));
  }

  queryRange(range)
  {
    if (!this.boundary.intersectsAABB(range)) return [];
    
    let pointsInRange = [];
    for (let p of this.points) {
      if (range.containsPoint(p)) pointsInRange.push(p);
    }

    if (!this.northWest) return pointsInRange;

    pointsInRange.push(...this.northWest.queryRange(range));
    pointsInRange.push(...this.northEast.queryRange(range));
    pointsInRange.push(...this.southWest.queryRange(range));
    pointsInRange.push(...this.southEast.queryRange(range));

    return pointsInRange;
  }

  showPoints()
  {
      for (let p of this.points) {
        push();
        stroke(255);
        strokeWeight(5);
        point(p.x, p.y);
        pop();
      }
      if (this.northWest) {
        this.northWest.showPoints()
        this.northEast.showPoints()
        this.southWest.showPoints()
        this.southEast.showPoints()
      }
    }

  showGrid()
  {
    push();
    stroke(50, 150, 50);
    noFill();
    strokeWeight(1);
    rectMode(CENTER);
    rect(this.boundary.center.x, this.boundary.center.y, this.boundary.halfDimension*2, this.boundary.halfDimension*2);

    if (this.northWest) {
      this.northWest.showGrid()
      this.northEast.showGrid()
      this.southWest.showGrid()
      this.southEast.showGrid()
    }
    pop();
  }
}
