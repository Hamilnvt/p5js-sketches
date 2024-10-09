class Cell
{
  constructor(x, y, w, h, name)
  {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.name = name;

    this.player = null;
  }

  show()
  {
    push();
    noFill();
    stroke(255);
    rectMode(CENTER);
    rect(this.x, this.y, this.w, this.h);
    fill(255);
    noStroke();
    textAlign(CENTER);
    textSize(this.w/5);
    text(this.name, this.x, this.y);
    pop();
  }

  effect()
  {
    console.log(`Sei capitato sulla cella '${this.name}'`);
  }
}

class Cell_Start extends Cell
{
  constructor(x, y, w, h, name)
  {
    super(x,y,w,h,name);
  }

  effect()
  {
    super.effect();
    console.log("Passi dal via, tieni 100 rubli");
    cell_effect_start(this.player);
  }
}

class Cell_Communism extends Cell
{
  constructor(x, y, w, h, name)
  {
    super(x,y,w,h,name);
  }

  effect()
  {
    super.effect();
    console.log("Comunismo momento");
    cell_effect_communism(this.player);
  }
}

class Cell_City extends Cell
{
  constructor(x, y, w, h, name)
  {
    super(x,y,w,h,name);
  }

  effect()
  {
    super.effect();
    console.log("Sei arrivato in città");
    cell_effect_city(this.player);
  }
}

class Cell_Gulag extends Cell
{
  constructor(x, y, w, h, name)
  {
    super(x,y,w,h,name);
  }

  effect()
  {
    //TODO questa cella è solo un transito.
    super.effect();
    if (this.player.in_gulag) {
      console.log("Sei finito nel gulag");
      cell_effect_gulag(this.player);
    }
    else console.log("Tranquillo, sei qui solo di passaggio");
  }
}

const cell_effect_start = (player) => {
  player.receive(100);
}

const cell_effect_communism = (player) => {
  //TODO per ora la scelta dell'altro giocatore è casuale, ma l'algoritmo potrebbe essere diverso (ad esempio, il giocatore con più rubli)
  let vittima = null;
  do vittima = players[floor(random(NumeroGiocatoriVivi()))];
  while (vittima == player)
  console.log(`'${player.name}' redistribuisce i beni con '${vittima.name}'`);

  let rubli_totali = player.rubli + vittima.rubli;
  player.rubli = rubli_totali / 2;
  vittima.rubli = rubli_totali / 2;
}

 const cell_effect_city = (player) => {
  //TODO pesca una carta
}
