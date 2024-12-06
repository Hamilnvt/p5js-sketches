//const TileTypes = ["grass", "sand", "sea"]
const TileTypes = ["sand", "sea"]
const typesNum = TileTypes.length

const TILE_COL_NOTYPE = [0, 0, 0, 255]
const TILE_COLS = {
    grass: [0,   180, 0,   255],
    sand:  [255, 180, 0,   255],
    sea:   [0,   0,   180, 255],
}

const g = "grass"
const s = "sand"
const c = "sea"
const rules_1 = {
    grass: [
	[g], [g], [g],
	[g], [g], [g, s],
	[g], [g], [g]
    ],
    sand: [
	[s, c], [g, s], [s, c],
	[g, s, c], [s],    [g, s, c],
	[s, c], [g, s], [s, c]
    ],
    sea: [
	[c, s], [c, s], [c, s],
	[c, s], [c], [c, s],
	[c, s], [c, s], [c, s]
    ]
}
const rules_2 = {
    sand: [
	[s],  [s,c], [s],
	[s, c], [s],    [s,c],
	[s],    [s, c], [s]
    ],
    sea: [
	[c], [c,s], [c],
	[c,s],    [c], [c, s],
	[c], [c,s], [c]
    ]
}
const rules = rules_2


class Tile
{
    constructor(i, j, type)
    {
	this.i = i
	this.j = j
	this.type = type || ""
	this.isCurrent = false
	this.isScanning = false
	this.open = false
	this.done = false
    }


    show()
    {
	push()
	noStroke()
	if (this.type) {
	    stroke(0)
	    fill(TILE_COLS[this.type])
	}
	else {
	    stroke(255)
	    fill(TILE_COL_NOTYPE)
	}
	rect(this.i*W, this.j*H, W, H)
	
	noStroke()
	if (this.open) {
	    fill(180, 0, 0)
	    circle(this.i*W+W/2, this.j*H+H/2, W/4)
	}
	if (this.isCurrent) {
	    fill(180, 0, 180)
	    circle(this.i*W+W/2, this.j*H+H/2, W/2)
	}
	if (this.isScanning) {
	    fill(0)	
	    circle(this.i*W+W/2, this.j*H+H/2, W/2)
	}
	pop()
    }

    chooseType(leader_type, neighbour_index)
    {
	let type_rules = rules[leader_type]
	let pool = type_rules[neighbour_index]
	let chosenType = pool[floor(random(pool.length))]
	this.type = chosenType
	//console.log("chosen type:", chosenType)
    }

    checkEdges(x, y)
    {
	return (this.i === 0 && x === -1     ||
		this.i === COLS-1 && x === 1 ||
		this.j === 0 && y === -1     ||
		this.j === ROWS-1 && y === 1)
    }
    
    getNeighbours()
    {
	var neighbours = []
	for (let x = -1; x <= 1; x++) {
	    for (let y = -1; y <= 1; y++) {
		if (this.checkEdges(x, y)) neighbours.push(null)
		else neighbours.push(tiles.get(this.i+x, this.j+y))
	    }
	}
	//console.log(`Neighbours of (${this.i},${this.j}):`, neighbours)
	return neighbours
    }

    getValidNeighbours()
    {
	var neighbours = this.getNeighbours()
	var valid_neighbours = neighbours.map(n => (n && n.type) ? null :  n)
	//console.log("Valid neighbours:", valid_neighbours)
	return valid_neighbours
    }
    
}
