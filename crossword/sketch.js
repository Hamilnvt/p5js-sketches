// Title: "crossword"
// Created: ven 6 dic 2024, 12:34:38, CET

//https://stackoverflow.com/questions/943113/algorithm-to-generate-a-crossword
//https://en.wikipedia.org/wiki/Crossword#Construction
//https://www.baeldung.com/cs/generate-crossword-puzzle

// sarebbe carino mettere i cruciverba in un albero (non necessario)

var words = []
var crosswords = []
const CANVAS_DIM = 600

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
}

const leParoleDiCiccio = () => {
    createWord("Deh", "Peffozza")
    createWord("Deserved for", "Ranged top")
    createWord("Jujutsu Kaisen", "Vaffanculo")
    //createWord("叔叔生物", "shushushengwu")
    //createWord("Cosa?", "delle patatine")
    //createWord("Non si sente quando Ciccio parla", "accento")
    //createWord("Pong", "ping")
    //createWord("Seducente tennistavolista", "Ago")
    //createWord("Ciccio Cavaliere Vacuo", "hxllw")
    //createWord("Addosso", "cacati")
    //createWord("Colori per gamberi", "cinque")
    //createWord("Tazze per pollo", "tre")
    //createWord("Tratto in comune con Milly", "stitichezza")
    //createWord("Il toplaner più forte", "Darius")
    //createWord("Sei stanco e _?", "affaticato")
    //createWord("Anche se questa panchina è di ferro, posso assicurarti che è molto _", "confortevole")
    //createWord("Non esiste posto migliore per raccogliere i propri pensieri prima di _", "ripartire")
    //createWord("GOAT di Hollow Knight", "Cornifer")
    //createWord("Insettini primordiali che devono esplodere", "aspidi")
    //createWord("Boss HK di merda", "KNG")
    //createWord("Il quinto che non hai ancora finito", "pantheon")
    //createWord("Nel modo in cui statuiva il pater familiae", "CVPR")    
}

function setup()
{
    createCanvas(CANVAS_DIM, CANVAS_DIM)
    
    words = []
    //leParoleDiCiccio()
    pocheParole()
    // devo anche controllare che non ci siano duplicati
    words.sort((a,b) => b.answer.length - a.answer.length)
    console.log("The Words:", words.map(w => w.answer))

    crosswords.push(new Crossword(words.map(w => w.answer), HORIZONTAL, SHUFFLE))
}

function draw()
{
    background(0)
    const c = crosswords[crosswords.length-1]
    c.show()
}


//TODO ovviamente non è giusto, alcuni cw vengono segnati come done, anche se non lo sono chiaramente
var iterations = 0
var theChosens = []
function mousePressed()
{
    console.log(iterations+". Crosswords:", crosswords)
    if (crosswords.length === 0) {
	console.log("The Chosens:", theChosens)
	return
    }
    for (let i = crosswords.length-1; i >= 0; i--) {
	const c = crosswords[i]
	if (c.done) {
	    theChosens.push(c)
	    crosswords.splice(i, 1)
	} else if (!c.right) crosswords.splice(i, 1)
	else c.advance()
    }
    iterations++
}
