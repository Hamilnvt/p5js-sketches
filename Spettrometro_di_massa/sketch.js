// Title: "Spettrometro_di_massa"
// Created: mer 9 ott 2024, 22:01:41, CEST

// raggio di curvatura, massa della particella, carica della particella,
// campo magnetico, velocità ortogonale

// IDEE:
// - checkbox per la variabile incognita (le altre con valori fissati)
// - slider/casella di testo per inserire altri valori
// - simulazione dell'aria

var particella;
const massa = 10;
const carica = -100;
const velocità = 1;

var cilindro = {
    raggio: 80,
    altezza: 300,
    colore: [20, 20, 20, 255]
}

function setup()
{
    createCanvas(windowWidth, windowHeight, WEBGL);
    particella = new Particella(massa, carica, velocità);

}

function draw()
{
    background(100, 100, 100)
    orbitControl(2,2,2)

    /// Assi
    // x
    push();
    noStroke();
    fill(180,0,0);
    rotateZ(PI/2)
    cylinder(2, windowWidth);
    pop();
    // y
    push();
    rotateX(PI/2)
    noStroke();
    fill(0, 180, 0);
    cylinder(2, windowWidth);
    pop();
    // z
    push();
    noStroke();
    fill(0, 0, 180);
    cylinder(2, windowWidth);
    pop();

    push();
    rotateX(PI/2);
    translate(0,0,-80)
    noStroke();
    fill(40,40,40);
    plane(windowWidth);
    pop();
    
    push();
    rotateZ(PI/2)
    noStroke();
    fill(cilindro.colore);
    cylinder(cilindro.raggio, cilindro.altezza, 24, 1, false, true);
    pop();

    //NON FUNZIONA! (per ora ;) BD )
    push();
    semicerchio = buildGeometry(() => {
	beginShape()
	strokeWeight(5)
	stroke(200,200,0)
	fill(200,200,0)
	for (let i=-PI;i<=PI;i+=0.05){
	    vertex(Math.cos(i), Math.sin(i), 150)
	}
	endShape(CLOSE)
    })
    model(semicerchio)
    pop();

    particella.aggiorna();
    particella.mostra();
} 
