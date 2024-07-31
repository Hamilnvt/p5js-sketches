var card_width = 100;
var card_height = 140;

class Card
{
  constructor(name, cost, effect, args, description)
  {
    this.name = name;
    this.cost = cost;
    this.effect = effect;
    this.args = args;
    this.description = description;

    this.pos = createVector(0, 0);
  }

  Print()
  {
    console.log(`Card "${this.name}":\n  cost: ${this.cost.toString()}\n  effect: "${this.effect.name || "anonymous"}"\n    body: ${this.effect}\n    args: ${this.args}\n  description: ${this.description}`);
  }

  Show()
  {
    push();
    rect(this.pos.x, this.pos.y, card_width, card_height); 
    fill(0);
    textAlign(LEFT, TOP);
    text(this.cost.toString(), this.pos.x+10, this.pos.y+10);
    pop();
  }

  Play()
  {
    console.log(`Playing "${this.name}" (${this.cost.toString()})`);
    this.effect(...this.args);
  }

}
