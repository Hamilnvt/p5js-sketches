// Title: "kinetic_energy"
// Created: lun 21 ott 2024, 15:11:03, CEST

/// TODO
// - vettore velocità iniziale

var b
var maxHeight

function setup()
{
    createCanvas(windowWidth, windowHeight/2)
    const initial_pos = createVector(100, windowHeight / 4)
    const initial_vel = createVector(random(10), random(-5, 5))
    b = new Body(initial_pos.x, initial_pos.y, initial_vel.x, initial_vel.y)
    maxHeight = initial_pos.y
}

function draw()
{
    background(50, 50, 50)
    b.update()
    b.show()

    maxHeight = b.pos.y < maxHeight ? b.pos.y : maxHeight
    push()
    stroke(255)
    strokeWeight(1)
    line(0, maxHeight, width, maxHeight)
    pop()
}
