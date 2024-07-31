class AABB {
  constructor(center, halfDimension)
  {
    this.center = center;
    this.halfDimension = halfDimension;
  }

  containsPoint(point)
  {
    return (point.x < this.center.x + this.halfDimension &&
            point.x >= this.center.x - this.halfDimension &&
            point.y < this.center.y + this.halfDimension &&
            point.y >= this.center.y - this.halfDimension);
  }

  intersectsAABB(other)
  {
    let this_left = this.center.x - this.halfDimension;
    let this_right = this.center.x + this.halfDimension;
    let this_top = this.center.y - this.halfDimension;
    let this_bottom = this.center.y + this.halfDimension;
    let other_left = other.center.x - other.halfDimension;
    let other_right = other.center.x + other.halfDimension;
    let other_top = other.center.y - other.halfDimension;
    let other_bottom = other.center.y + other.halfDimension;

    return !(other_left > this_right ||
             other_right < this_left ||
             other_top > this_bottom ||
             other_bottom < this_top);
  }

  show(color, weight)
  {
    push();
    noFill();
    stroke(color);
    strokeWeight(weight);
    rectMode(CENTER);
    rect(this.center.x, this.center.y, this.halfDimension*2, this.halfDimension*2);
    pop();
  }
}
