const mag = 5

class Ball
{
  constructor(x, y, r)
  {
    this.pos = createVector(x, y);
    this.vel = createVector(random(-mag, mag), random(-mag, mag));
    this.r = r;
    this.col = [random(255), random(255), random(255)];
  }

  show()
  {
    push();
    fill(this.col);
    noStroke();
    circle(this.pos.x, this.pos.y, this.r*2);
    pop();
  }

  update()
  {
    this.pos.add(this.vel);
    this.checkCollisionEdges();
  }

  checkCollisionEdges()
  {
    if (this.pos.x - this.r < 0) {
      this.pos.x = this.r;
      this.vel.x *= -1;
    } else if (this.pos.x + this.r > width) {
      this.pos.x = width - this.r;
      this.vel.x *= -1;
    }
    if (this.pos.y - this.r < 0) {
      this.pos.y = this.r;
      this.vel.y *= -1;
    } else if (this.pos.y + this.r > height) {
      this.pos.y = height - this.r;
      this.vel.y *= -1;
    }
  }

}
