// Title: "procedural_generation"
// Created: lun 29 lug 2024, 12:40:43, CEST

/* TODO
 *  - openTiles pieni di schifezze
 *  - Tiles potrebbe avere sia le regole sia l'ordine in cui togliere da openTiles (inizio, fine, random)
*/

const N = 5
const ROWS = N
const COLS = N
var W
var H

const BG_COL = [40, 40, 40, 255]

var tiles;

function setup()
{
    createCanvas(600, 600)
    background(40)
    W = width / COLS
    H = height / ROWS
    
    let rand_i = floor(random(ROWS))
    let rand_j = floor(random(COLS))
    let rand_type = TileTypes[floor(random(typesNum))]
    let initial_tile = new Tile(rand_i, rand_j, rand_type)
    initial_tile.open = true
    initial_tile.isCurrent = true
    tiles = new Tiles(initial_tile)

    frameRate(5)
}

function showNums()
{
    let i_counter = 1
    let j_counter = 1
    push()
    noFill()
    stroke(255)
    for (let i = 0; i < ROWS; i++) {
	for (let j = 0; j < COLS; j++) {
	    if (i === 0 && j === 0) text("0", 2, 10)
	    else if (i === 0) text(i_counter++, 2, H*(j+1/2))
	    else if (j === 0) text(j_counter++, W*i+10, 10)
	}
    }
    pop()
}

function showTiles()
{
    for (let i = 0; i < ROWS; i++) {
	for (let j = 0; j < COLS; j++) {
	    let tile = tiles.get(i, j)
	    tile.show()
	}
    }
}

function draw()
{
    //tiles.generate_all()
    
    showTiles()
    //showNums()

    if (tiles.generating) tiles.generate_next()
    else tiles.validate_next
}

function keyPressed()
{
    if (key === ' ') tiles.generate_next()
}
