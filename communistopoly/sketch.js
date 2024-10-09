// Title: "communistopoly"
// Created: gio 1 ago 2024, 08:13:55, CEST

var board;
var next_board;
var players = [];
const n = 4;
var name = 0;

var p_index = 0;
var curr_player = null;

function setup()
{
  createCanvas(windowWidth, windowHeight);

  board = new Board(std_config);
  for (let i = 0; i < n; i++) {
    let p = new Player(name++, [random(255), random(255), random(255)]);
    players.push(p);
  }
  curr_player = players[0];
  //setFrameRate(1);
}

var pause = false;
var run = true;
var playing_turn = false;
function draw()
{
  if (run) {

    background(0);

    board.show();
    for (let p of players) {
      p.show();
    }

    if (playing_turn) {
      curr_player.play_turn();
      console.log("");

      do {
        p_index = (p_index+1) % n;
      }
      while (players[p_index].dead)
      curr_player = players[p_index];

      playing_turn = false;
    }
  }
  else {
    background(100);
    push();
    textSize(100);
    textAlign(CENTER);
    text("Finito", width/2, height/2);
    pop();
  }
}

function keyPressed()
{
  if (key === 'q') run = false;
  else if (key === 'p') {
    pause ? noLoop() : loop();
    pause = !pause;
  }
  else if (key === ' ') playing_turn = true;
}

function NumeroGiocatoriVivi()
{
  let count = 0;
  for (let i = 0; i < players.length; i++) {
    if (!players[i].dead) count++;
  }
  return count;
}
