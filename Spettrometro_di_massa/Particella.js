class Particella
{
    constructor(massa, carica, velocità)
    {
	this.pos = createVector(0, 0, 0);
	this.velocità = createVector(velocità, 0, 0);
	this.massa = massa;
	this.raggio = 5*massa;
	this.carica = carica;
	this.colore = carica > 0 ? [150+this.carica*50, 150-this.carica, 150-this.carica, 255] : [150+this.carica, 150+this.carica, 150-this.carica*50, 255]
    }

    mostra()
    {
	push();
	translate(this.pos);
	fill(this.colore);
	stroke(this.colore);
	sphere(this.raggio);
	pop();
    }

    aggiorna()
    {
	this.pos.add(this.velocità);
    }
}
