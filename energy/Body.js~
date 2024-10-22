const MASS = 100
const GRAVITY = 9.81
const ELASTIC_COEFF = 0.9
const FRICTION = 10

class Body
{
    constructor(x, y, vx, vy)
    {
	this.pos = createVector(x, y)
	this.vel = createVector(vx, vy)
	this.acc = createVector(0, 0)
	this.m = MASS
	this.r = this.m / 10
	this.c = [random()*255, random()*255, random()*255, 255]
	this.path = []
	this.energy = null
	this.calc_energy()
    }

    calc_energy() {
	this.energy = createVector(this.vel.x*this.vel.x, this.vel.y*this.vel.y).mult(this.m/2)
    }
    
    trace()
    {
	push()
	stroke(255)
	noFill()
	beginShape(POINTS)
	for (let i = 0; i < this.path.length; i++) {
	    vertex(this.path[i].x, this.path[i].y)
	}
	endShape()
	stroke(100)
	line(0, this.pos.y, width, this.pos.y)
	pop()
    }
    
    show()
    {
	push()
	fill(this.c)
	noStroke()
	circle(this.pos.x, this.pos.y, this.r*2)
	this.trace()
	pop()
    }

    applyForce(force)
    {
	force.div(this.m)
	this.acc.add(force)
    }

    checkEdges()
    {
	const friction = createVector(FRICTION, 0)
	const bottom_collision = this.pos.y + this.r > height
	const left_collision = this.pos.x - this.r < 0
	const right_collision = this.pos.x + this.r > width

	if (bottom_collision) {
	    this.pos.y = height - this.r
	    this.vel.y *= -ELASTIC_COEFF
	    
	    if (this.vel.x > 0) this.applyForce(friction.mult(-1))
	    else this.applyForce(friction)
	}
	
	if (left_collision || right_collision) {
	    if (left_collision) this.pos.x = this.r
	    else this.pos.x = width - this.r
	    this.vel.x *= -ELASTIC_COEFF
	}
    }
    
    update()
    {
	const gravity = createVector(0, GRAVITY)
	this.applyForce(gravity)
	this.checkEdges()
	this.vel.add(this.acc)
	this.pos.add(this.vel)
	this.path.push(createVector(this.pos.x, this.pos.y))
	this.acc.mult(0)
	this.calc_energy()
    }

}
