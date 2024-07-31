class Deck
{
  constructor(name, cards)
  {
    this.name = name;
    this.cards = [];
    if (cards !== undefined) {
      for (let i = 0; i < cards.length; i++) {
        this.cards[i] = cards[i];
      }
    }
  }

  Copy()
  {
    return new Deck(this.name, this.cards);
  }

  Print()
  {
    console.log(`Deck "${this.name}" (${this.cards.length}):`);
    for (let i = 0; i < this.cards.length; i++) {
      this.cards[i].Print()
    }
  }

  PrintNames()
  {
    console.log(`Deck "${this.name}" (${this.cards.length}):`);
    for (let i = 0; i < this.cards.length; i++) {
      console.log(`  ${i+1}. ${this.cards[i].name}`);
    }
  }

  length() { return this.cards.length; }

  Shuffle() {
    for (let i = this.cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }

  AddCard(card)
  {
    this.cards.push(card);
  }

  TopCard()
  {
    return this.cards[0];
  }

  RemoveCard(card_name)
  {
    let card = this.FindCardByName(card_name);
    if (card) {
      this.cards.slice(this.cards.indexOf(card), 1);
      console.log("Card removed from deck");
    }
  }

  FindCardByName(card_name)
  {
    let card = this.cards.find((card) => card.name === card_name);
    if (!card) console.log("Card not found in deck");
    else console.log("Card found in deck");
    return card;
  }

}
