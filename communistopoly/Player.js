const rubli_iniziali = 100;

class Player
{
  constructor(name, color)
  {
    this.name = name;
    this.col = color;
    this.pos = 0;
    this.rubli = rubli_iniziali;
    this.card = null;

    this.in_gulag = false;

    this.dead = false;
  }

  show()
  {
    if (this.dead) return;

    let x = board.cells[this.pos].x;
    let w = board.cells[this.pos].w;
    let y = board.cells[this.pos].y;
    let h = board.cells[this.pos].h;
    push();
    fill(this.col); 
    noStroke();
    circle(x-w/3, y-h/3, 10, 10);
    fill(255);
    textAlign(CENTER);
    text(this.name, x-w/3, y-h/3);
    pop();
  }

  throw_dice()
  {
    let r1 = floor(random(1,7));
    let r2 = floor(random(1,7));
    return r1 + r2;
  }

  advance(amount)
  {
    let new_pos = (this.pos+amount) % board.n_cells;
    console.log(`Advancing by ${amount}: from ${this.pos} to ${new_pos}`)
    this.pos = new_pos;
    board.cells[this.pos].player = this;
    board.cells[this.pos].effect();
  }

  play_turn()
  {
    console.log(`Playing ${this.name}'s turn:`);

    if (!this.in_gulag) {
      this.play_card();
      
      let dice = this.throw_dice();
      this.advance(dice);
    }
    else {
      console.log("Sei nel gulag, che cazzo vuoi fare");
      //TODO
    }
  }

  play_card()
  {
    if (this.card) {
      this.card.play(this);
    }
    else console.log("Nessuna carta si attiva")
  }

  can_pay(amount)
  {
    return amount <= this.rubli;
  }

  pay(amount, player)
  {
    if (!this.can_pay(amount)) this.alive = false;
    else {
      this.rubli -= amount;
      if (player) player += amount;
    }
  }

  receive(amount, players)
  {
    if (players) {
      for (let p of players) {
        p.pay(amount, this);
      }
    } else this.rubli += amount;
  }
}
