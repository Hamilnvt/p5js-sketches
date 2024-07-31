var p;
var turn = 0;
var end_turn = false;

var hand_box;

function setup()
{ 
  createCanvas(windowWidth, windowHeight);

  let deck = new Deck("Il mio primo deck");

  for (let i = 0; i < 10; i++) {
    let card = new Card(`Card ${i}`, new Cost(i%5, i), (msg) => console.log(msg), [i], `Helo, I'm card ${i}`);
    deck.AddCard(card);
  }

  hand_box = {x: 100, y:height-250, w: width-200, h: 200};


  p = new Player("Pippo", deck, 10);

  p.FirstDraw();
  turn++;
}

function draw()
{
  background(60);

  if (p.health < 0) {
    GameOver();
  }

  if (end_turn) {
    console.log(`Turn ${turn} ends`);
    turn++;
    end_turn = false;
    console.log(`Turn ${turn} begins`);
  }
  else {
    p.ShowHand();
  }

  p.ShowInfo();
}

function CheckPointRectCollision(point, rect)
{
	return (point.x >= rect.x && point.x <= rect.x + rect.w && point.y >= rect.y && point.y <= rect.y + rect.h);;
}

function mouseClicked()
{ 
  for (let i = p.hand.length-1; i >= 0; i--) {
    let card = p.hand[i];
    if (CheckPointRectCollision({x:mouseX, y:mouseY}, {x:card.pos.x, y:card.pos.y, w:card_width, h:card_height})) {
      console.log(`Clicked on card ${i}`);
      p.Play(i);
    }
  } 
}

function GameOver()
{
  throw new Error("Game Over not implemented");
}

/*
TODO

- draw card
- gioca tutte le carte se sono schiacciate, dovrei tenere traccia di quanto è visibile per fare la CheckPointRectCollision (ad es. variabile vettore visible(visible_w, visible_h))
- cominciare a pensare a qualche carta
*/
