// Title: "crossword"
// Created: ven 6 dic 2024, 12:34:38, CET

//https://stackoverflow.com/questions/943113/algorithm-to-generate-a-crossword
//https://en.wikipedia.org/wiki/Crossword#Construction
//https://www.baeldung.com/cs/generate-crossword-puzzle
//https://github.com/AllAlgorithms/algorithms/blob/master/docs/crossword-puzzle.md

// sarebbe carino mettere i cruciverba in un albero (non necessario)

// probabilmente ho sbagliato tutto, nel senso che sarebbe stato meglio prima controllare quali intersezioni si possono fare, poi mettere i '/' e poi piazzare le parole,
// invece io sto piazzando una parola alla volta sperando che esca qualcosa di decente

var words = []
var crosswords = []
var newCrosswords = []
const CANVAS_DIM = 600

const MAX_CROSSWORDS = 1000
const MAX_CHILDREN = 1

var initialCrossword

var theChosens = []
var allDone = false

function createWord(cue, answer)
{
    answer = answer.toUpperCase().split(' ').join('')+"/"
    const word = { cue, answer }
    words.push(word)
}

const pocheParole = () => {
  createWord("", "ciao")
  createWord("", "miao")
  createWord("", "caio")
  createWord("", "maio")
  createWord("", "mario")
  createWord("", "asia")
  createWord("", "piqquina")
}

const leParoleDiCiccio = () => {
    createWord("Deh", "Peffozza")
    createWord("Deserved for", "Ranged top")
    createWord("Jujutsu Kaisen", "Vaffanculo")
    createWord("叔叔生物", "shushushengwu")
    createWord("Cosa?", "delle patatine")
    createWord("Non si sente quando Ciccio parla", "accento")
    createWord("Pong", "ping")
    createWord("Seducente tennistavolista", "Ago")
    createWord("Ciccio Cavaliere Vacuo", "hxllw")
    createWord("Addosso", "cacati")
    createWord("Colori per gamberi", "cinque")
    createWord("Tazze per pollo", "tre")
    createWord("Tratto in comune con Milly", "stitichezza")
    createWord("Il toplaner più forte", "Darius")
    createWord("Sei stanco e _?", "affaticato")
    createWord("Anche se questa panchina è di ferro, posso assicurarti che è molto _", "confortevole")
    createWord("Non esiste posto migliore per raccogliere i propri pensieri prima di _", "ripartire")
    createWord("GOAT di Hollow Knight", "Cornifer")
    createWord("Insettini primordiali che devono esplodere", "aspidi")
    createWord("Boss HK di merda", "KNG")
    createWord("Il quinto che non hai ancora finito", "pantheon")
    createWord("Nel modo in cui statuiva il pater familiae", "CVPR")    
}


//TODO ovviamente non è giusto, alcuni cw vengono segnati come done, anche se non lo sono chiaramente (succede ancora? da controllare)
var iterations = 0
var doIteration = true
function generateIteration()
{
  if (allDone) return
  if (!doIteration && !allDone) {
    for (let c of crosswords) {
      if (c.done) {
        c.evaluateScore()
        theChosens.push(c)
      }
    }
    theChosens = theChosens.sort((c1, c2) => c2.score - c1.score).slice(0, 10)
    console.log("The Chosens:", theChosens)
    allDone = true
  } else {
    //const crosswords_cp = crosswords.map(c => c)
    //console.log(iterations+". Crosswords:", crosswords_cp)
    console.log(iterations+". Crosswords:", crosswords.length)
    for (let i = crosswords.length-1; i >= 0; i--) {
      const c = crosswords[i]
      if (c.done) {
        theChosens.push(crosswords[i])
      }
      else c.advance()
    }
    //console.log("old:", crosswords)
    //console.log("new:", newCrosswords)
    if (newCrosswords.length === 0) {
      doIteration = false
    } else {
      crosswords = newCrosswords
      newCrosswords = []
      iterations++
    }
  }
}

function generateAll()
{
  while (!allDone) generateIteration()
}

function setup()
{
    createCanvas(CANVAS_DIM, CANVAS_DIM)
    
    words = []
    leParoleDiCiccio()
    //pocheParole()
    // devo anche controllare che non ci siano duplicati (oppure ci possono essere, v. Makima)
    words.sort((a,b) => b.answer.length - a.answer.length)
    console.log("The Words:", words.map(w => w.answer))

    initialCrossword = new Crossword(words.map(w => w.answer), HORIZONTAL, SHUFFLE)
    crosswords.push(initialCrossword)
    generateAll()
}

var i = 0
function draw()
{
    background(0)
    
    if (!allDone) {
      crosswords[0].show()
    } else if (theChosens.length > 0) {
      const c = theChosens[i]
      c.show()
      //i = (i+1) % theChosens.length
    } else {
      console.error("No chosens :(")
      noLoop()
    }
}

function keyPressed()
{
  if (!allDone) return
  if (keyCode === LEFT_ARROW) i = (i-1+theChosens.length)%theChosens.length
  else if (keyCode === RIGHT_ARROW) i = (i+1)%theChosens.length
  console.log(i, theChosens[i].score)
}

