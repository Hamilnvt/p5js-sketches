const MASS = 1
const GRAVITY = 9.81
const FRICTION = 10

const MU = 0.25

const initial_x = 100

class Body
{
    constructor(initial_energy)
    {
	this.x = initial_x
	this.energy = initial_energy
	this.vel = null
	this.m = MASS
	this.r = this.m*20
	this.y = windowHeight / 4 - this.r
	this.c = [random()*255, random()*255, random()*255, 255]
	this.calc_velocity()
    }

    calc_velocity() {
	if (this.energy >= 0) this.vel = sqrt(2*this.energy/this.m)
	else this.vel = 0
    }
        
    show()
    {
	push()
	fill(this.c)
	noStroke()
	circle(this.x, this.y, this.r*2)
	stroke(255)
	line(this.x, this.y, this.x + this.vel*10, this.y)
	pop()
    }

    applyForce(force)
    {
	
    }
    
    update()
    {
	this.energy *= 0.98
	this.calc_velocity()
	this.x += this.vel
	console.log(`Energy: ${this.energy}\nVelocity: ${this.vel}`)
    }

}
