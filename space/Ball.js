const random_sign = () => {
  let r = random(1);
  return (r < 0.5) ? 1 : -1;
}

var acc = 0;

class Ball
{
  constructor(x, y, m)
  {
    this.pos = createVector(x, y);
    this.r = m;
    this.z = 1/m;
    this.speed = m*random(0, 0.3);
    this.col = [random(50, 255), 0, random(50, 255)];
  }

  show()
  {
    push();
    fill(this.col);
    noStroke();
    let x_stretch = (1/this.z)*acc*0.02+1;
    //let x_stretch = acc/2+1;

    let y_stretch;
    if (acc < 7) y_stretch = (1/this.z)*acc*0.01+1;
    else y_stretch = (1/this.z)*acc*0.05+1;
    //let y_stretch = acc/5+1;
    ellipse(this.pos.x, this.pos.y, this.r*2*x_stretch, this.r*2/y_stretch);
    pop();
  }

  update()
  {
    this.pos.x += this.speed + acc*(1/this.z);
  }

  checkEdgesCollision()
  {
    return ((this.pos.x + this.r < 0) || (this.pos.x - this.r > width));
  }

}
