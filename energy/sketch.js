// Title: "kinetic_energy"
// Created: lun 21 ott 2024, 15:11:03, CEST

/// TODO
// - vettore velocità iniziale

var b
var ground_y

function setup()
{
    const wh = windowHeight / 2
    createCanvas(windowWidth, wh)
    ground_y = wh / 2
    const initial_energy = 10
    b = new Body(initial_energy)
}

function draw()
{
    background(50, 50, 50)

    push()
    stroke(255)
    line(0, ground_y, width, ground_y)
    pop()
    
    b.update()
    b.show()
}
