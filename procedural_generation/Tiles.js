class Tiles
{
    constructor(initial_tile)
    {
	this.grid = []
	for (let i = 0; i < ROWS; i++) {
	    var row = []
	    for (let j = 0; j < COLS; j++) {
		if (i === initial_tile.i && j === initial_tile.j) row.push(initial_tile)
		else {
		    let t = new Tile(i, j)
		    row.push(t)
		}
	    }
	    this.grid.push(row)
	}
	this.openTiles = []
	this.tilesToScan = []
	this.current = initial_tile
	this.generating = true
    }

    get(i, j) { return this.grid[i][j] }

    nextOpenTile()
    {
	//console.log("Open tiles:", this.openTiles)
	let next_tile = null
	if (this.openTiles.length >= 0) {
	    //let i = floor(random(this.openTiles.length))
	    let i = 0
	    //let i = this.openTiles.length-1
	    next_tile = this.openTiles.splice(i, 1)[0]
	}
	this.current.open = false
	this.current.isCurrent = false
	this.current = next_tile
	if (this.current) this.current.isCurrent = true
    }

    nextTileToScan()
    {
	let next_tile = null
	if (this.tilesToScan.length >= 0) {
	    next_tile = this.tilesToScan.splice(0, 1)[0]
	}
	this.current = next_tile
	if (this.current) this.current.isScanning = true
    }

    generate_next()
    {
	//console.log("current:", this.current)
	if (this.current) {
	    let neighbours = this.current.getValidNeighbours()
	    for (let k = 0; k < neighbours.length; k++) {
		let neighbour = neighbours[k]
		if (neighbour && k !== 4) {
		    neighbour.chooseType(this.current.type, k)
		    if (!neighbour.open) {
			this.openTiles.push(neighbour)
			neighbour.open = true
		    }
		}
	    }
	    this.nextOpenTile()
	    //console.log("next:", this.current)
	}
	else {
	    this.generating = false
	    console.log("Generation ended")
	    let rand_i = floor(random(ROWS))
	    let rand_j = floor(random(COLS))
	    this.current = this.get(rand_i, rand_j)
	    this.current.isScanning = true
	}
    }

    generate_all()
    {
	while (this.current && !this.current.isScanning) this.generate_next()
	this.generating = false
	console.log("Generation ended")
	//this.validate_all()
	noLoop()
    }

    fix(tile_to_fix)
    {
	var neighbours = tile_to_fix.getNeighbours()
	var valid_types = new Set([...TileTypes])
	for (let n of neighbours) {
	    if (!n || (this.current.i === n.i && this.current.j === n.j)) continue
	    for (let i = 0; i < rules[n.type].length; i++) {
		let n_rules = new Set([...rules[n.type][i]])
		valid_types = valid_types.intersection(n_rules)
	    }
	}
	console.log("valid types:", valid_types)
	if (valid_types.size > 0) {
	    let rand_i = Math.floor(random(valid_types.size))
	    let rand_type = Array.from(valid_types)[rand_i]
	    tile_to_fix.type = rand_type
	}
	tile_to_fix.done = true
    }
    
    validate_next()
    {
	if (this.current) {
	    let neighbours = this.current.getNeighbours()
	    //console.log(` validating (${this.current.i},${this.current.j})`)
	    let type_rules = rules[this.current.type]
	    for (let k = 0; k < neighbours.length; k++) {
		let neighbour = neighbours[k]
		if (!neighbour || neighbour.done || k === 4) continue
		else {
		    //console.log("scanning neighbour", neighbour)
		    this.tilesToScan.push(neighbour)
		}
		let expected_types = type_rules[k]
		var valid = false
		for (let t of expected_types) {
		    const equals = t === neighbour.type
		    valid |= equals
		}
		if (!valid) {
		    console.error(`Neighbour (${neighbour.i},${neighbour.j}):\n- expected: ${expected_types}\n- got ${neighbour.type}`)
		    console.log("old type:", neighbour.type)
		    //this.fix(neighbour)
		    // approccio naive
		    neighbour.type = expected_types[Math.floor(random(expected_types.length))]
		    neighbour.done = true
		    //
		    console.log("new type:", neighbour.type)
		} else neighbour.done = true
	    }
	    this.current.done = true
	    this.current.isScanning = false
	    this.nextTileToScan()
	    return false
	} else {
	    console.log("Validation ended")
	    noLoop()
	    return true
	}
    }

    
}
