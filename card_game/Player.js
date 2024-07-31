class Player
{
  constructor(name, deck, health)
  {
    this.name = name;

    this.deck = deck.Copy();
    this.deck.Shuffle();

    this.hand = [];
    this.hand_size = 5; //TODO
    this.hand_count = 0;

    this.first_draw = 3;
    this.draw = 1;

    this.discard_pile = [];

    this.mana = new Resource(1, 5);
    this.coins = new Resource(2, 5);
    this.souls = new Resource(3, 5);
    this.health = health;
  }

  PrintInfo()
  {
    console.log(`Player ${this.name}:\n  ${this.mana.toString()}\n  ${this.coins.toString()}\n  ${this.souls.toString()}\n  ${this.health} health`);
  }

  PrintDeck()
  {
    this.deck.PrintNames();
  }

  PrintHand()
  {
    if (this.hand.length == 0) console.log("Hand is empty");
    else {
      console.log("Hand:");
      for (let i = 0; i < this.hand.length; i++) {
        console.log(`  ${i+1}. ${this.hand[i].name}`);
      }
    }
  }

  PrintDiscardPile()
  {
    if (this.discard_pile.length == 0) console.log("Discard pile is empty");
    else {
      console.log("Discard pile:");
      for (let i = 0; i < this.discard_pile.length; i++) {
        console.log(`  ${i+1}. ${this.discard_pile[i].name}`);
      }
    }
  }

  Print()
  {
    this.PrintInfo();
    this.PrintDeck();
    this.PrintHand();
    this.PrintDiscardPile();
  }


  AddCardToHand(card)
  {
    this.hand.push(card);
  }

  Draw(n)
  {
    for (let i = 0; i < n && this.deck.length() > 0; i++) {
      let card = this.deck.TopCard();
      this.AddCardToHand(card);
      this.deck.cards.splice(0, 1);
    }
  }

  FirstDraw()
  {
    this.Draw(this.first_draw);
  }

  Play(index)
  {
    if (index >= 0 && index < this.hand.length) {
      let card = this.hand[index];
      let cost = card.cost;
      if (this.canAfford(cost)) {
        this.Pay(cost);
        this.hand.splice(index, 1);
        card.Play();
        this.discard_pile.push(card);
      }
      else console.log("Cannot afford to play this card");
    }
    else throw new Error("Index out of bound");
  } 
  
  canAfford(cost)
  {
    switch (cost.type) {
      case 0: case 4:
        return true;
      case 1:
        return this.mana.value >= cost.value;
      case 2:
        return this.coins.value >= cost.value;
      case 3:
        return this.souls.value >= cost.value;
      default:
        return false;
    }
  }

  Pay(cost)
  {
    switch (cost.type) {
      case 0:
      break;
      case 1:
        this.mana.value -= cost.value;
      break;
      case 2:
        this.coins.value -= cost.value;
      break;
      case 3:
        this.souls.value -= cost.value;
      break;
      case 4:
        this.health -= cost.value;
      break;
      default:
        console.log("unreachable");
      break;
    }
  }

  ShowHand()
  {
    let len = this.hand.length;
    let space_sides = (hand_box.w-card_width) / len;
    let space_between = card_width*len;
    for (let i = this.hand.length - 1; i >= 0; i--) {
      //TODO ci sono ancora valori hardcoded e non funziona come voglio
      this.hand[i].pos = createVector(space_sides+i*space_between, 3*height/4);
      this.hand[i].Show();
    } 
    push();
    stroke(200);
    line(this.hand[0].pos.x, 0, this.hand[0].pos.x, height);
    line(this.hand.slice(-1)[0].pos.x + card_width, 0, this.hand.slice(-1)[0].pos.x + card_width, height);
    pop();
  }
  
  ShowInfo()
  {
    push();
    fill(255);
    textSize(20);
    text("Player info:", 10, 20);
    text(`- health: ${this.health}`, 10, 50);
    text(`- mana: ${this.mana.value}`, 10, 70);
    text(`- coins: ${this.coins.value}`, 10, 90);
    text(`- souls: ${this.souls.value}`, 10, 110);
    pop();
  }
}
