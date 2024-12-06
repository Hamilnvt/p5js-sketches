// Title: "crossword"
// Created: ven 6 dic 2024, 12:34:38, CET

//https://stackoverflow.com/questions/943113/algorithm-to-generate-a-crossword

var words = []

var WIDTH
var HEIGHT
var grid = []
var cell_dim

function createWord(cue, answer)
{
    answer = answer.toUpperCase()
    const word = { cue, answer }
    words.push(word)
}

const leParoleDiCiccio = () => {
    words = []
    createWord("Deh", "Peffozza")
    createWord("Deserved for", "Ranged_top")
    createWord("Jujutsu Kaisen", "Vaffanculo")

    words.sort((a,b) => b.answer.length - a.answer.length)
}

function setup()
{
    createCanvas(600, 600)
    
    leParoleDiCiccio()
    console.log(words)

    WIDTH = words[0].answer.length
    HEIGHT = WIDTH
    cell_dim = createVector(width/WIDTH, height/HEIGHT)
    for (let i = 0; i < HEIGHT; i++) {
	let g_row = []
	for (let j = 0; j < WIDTH; j++) {
	    let content = ""
	    g_row.push(content)
	}
	grid.push(g_row)
    }
    console.log(grid)
}

function draw()
{
    background(0)
    for (let i = 0; i < HEIGHT; i++) {
	for (let j = 0; j < WIDTH; j++) {
	    push()
	    noFill()
	    stroke(255)
	    strokeWeight(2)
	    rect(i*cell_dim.x, j*cell_dim.y, cell_dim.x, cell_dim.y)
	    pop()
	    
	    push()
	    fill(255)
	    noStroke()
	    textSize(30)
	    text(grid[i][j], i*cell_dim.x+cell_dim.x/2-cell_dim.x/4+4, j*cell_dim.y+cell_dim.y/2+8)
	    pop()
	}
    }

}

const firstHorizontal = true
function placeWord(i)
{
    const answer = words[i].answer
    if (i == 0) {
	for (let j = 0; j < answer.length; j++) {
	    if (firstHorizontal) grid[j][0] = answer[j]
	    else grid[0][j] = answer[j]
	}
    } else {
	//TODO:
	// - se c'è già quella coordinata con la stessa lettera ignorala
	// - controlla quali coordinate sono valide
	const coordinates = []
	for (let j = 0; j < answer.length; j++) {
	    for (let m_i = 0; m_i < HEIGHT; m_i++) {
		for (let m_j = 0; m_j < WIDTH; m_j++) {
		    if (grid[m_i][m_j] === answer[j]) {
			coordinates.push({
			    letter: answer[j],
			    i: m_i,
			    j: m_j
			})
		    }
		}
	    }
	}
	console.log(coordinates)
    }
}

var i = 0
function mousePressed()
{
    placeWord(i)
    i++
}
