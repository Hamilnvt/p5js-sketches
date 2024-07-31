class Particle {
  
    constructor(x,y,c) {
      this.pos = createVector(x,y);
      this.vel = createVector(0,0);
      this.c = c;
    }
    
    update() {
      push();
      stroke(this.c);
      strokeWeight(5);
      point(this.pos.x,this.pos.y);  
      pop();
    }
    
    
    
    
  }