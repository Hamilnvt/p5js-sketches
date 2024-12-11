const WIDTH = 31
const HORIZONTAL = "H"
const VERTICAL = "V"
const SHUFFLE = true

// 1. piazza la prima parola
// 2. genera le coordinate per la seconda
// 3. prende la prima coordinata e la assegna a te
// 4. per ogni altra coordinata crea un nuovo crossword
// ...

// [TODO]
// - dunque, c'è un grosso problema con l'orientazione delle parole, riguarda placeWord e canAdd(H|V)
// (per il resto funziona)

class Crossword
{
    constructor(words, direction, doShuffle)
    {
	this.words = []
	this.initialWords = []
	for (let i = 0; i < words.length; i++) {
	    this.words.push(words[i])
	    this.initialWords.push(words[i])
	}
	if (doShuffle) {
	    this.shuffleWords()
	    console.log("Initial Words:", this.words)
	}
	const word = this.words.shift()
	const len = word.length
	const spaces = floor((WIDTH-len)/2)
	const pos_x = direction === 'H' ? floor(WIDTH/2) : spaces
	const pos_y = direction === 'H' ? spaces : floor(WIDTH/2)
	this.nextWord = {
	    first: true,
	    word,
	    coordinate: {
		i: 0,
		x: pos_x,
		y: pos_y,
		dir: direction
	    }
	}
	this.w = WIDTH
	this.cell_dim = createVector(width/this.w, width/this.w)
	this.grid = []
	for (let i = 0; i < this.w; i++) {
	    this.grid.push([])
	    for (let j = 0; j < this.w; j++) {
		this.grid[i].push("")
	    }
	}
	this.done = false
	this.right = true
	this.score = -1
    }

    copy(word, coordinate)
    {
	console.log("Creating new crossword", coordinate)
	const crossword = new Crossword(this.initialWords, coordinate.dir)
	crossword.words = (() => {
	    const ws = [word]
	    for (let w of this.words) ws.push(w)
	    return ws
	})()
	for (let i = 0; i < this.w; i++) {
	    for (let j = 0; j < this.w; j++) {
		crossword.grid[i][j] = this.grid[i][j]
	    }
	}
	delete coordinate.word
	crossword.nextWord = {
	    first: false,
	    word,
	    coordinate
	}
	return crossword
    }

    show()
    {
	for (let i = 0; i < this.w; i++) {
	    for (let j = 0; j < this.w; j++) {
		push()
		if (this.grid[i][j] === "/") fill(255)
		else noFill()
		stroke(255)
		rect(j*this.cell_dim.x, i*this.cell_dim.y, this.cell_dim.x, this.cell_dim.y)
		pop()
		
		push()
		fill(255)
		noStroke()
		textSize(3*this.cell_dim.x/5)
		textAlign(CENTER, CENTER)
		text(this.grid[i][j], (j+1/2)*this.cell_dim.x, (i+1/2)*this.cell_dim.y)
		pop()
	    }
	}
    }

    searchCoordinates(word)
    {
	if (!word) {
	    //TODO ora lancia l'errore, poi considererà solmente il cruciverba non valido
	    throw new Error("No word provided")
	    this.right = false
	    return []
	}
	if (word === this.nextWord.word) {
	    console.log(word+" è la prima parola, verrà sempre messa al centro")
	    return []
	}
	let coordinates = []
	//TODO:
	// - controlla quali coordinate sono valide
	//   > bisogna saltare uno spazio quando si vuole inserire una parola per evitare che
	//     si appiccichino due parole
	const len = word.length
	for (let j = 0; j < len; j++) {
	    for (let m_i = 0; m_i < this.w; m_i++) {
		for (let m_j = 0; m_j < this.w; m_j++) {
		    if (this.grid[m_i][m_j] === word[j]) {
			const c = {
			    word,
			    i: j,
			    x: m_i,
			    y: m_j,
			    h: false,
			    v: false
			}
			c.h = this.canAddV(c)
			c.v = this.canAddH(c)
			if (c.h || c.v) coordinates.push(c)
		    }
		}
	    }
	}
	console.log("Coordinates for "+word+"\n", coordinates)
	if (coordinates.length === 0) {
	    console.log(word+" can't be added")
	    this.right = false
	} else console.log(word+" can be added")
	return coordinates
    }

    placeWord(word, coordinate)
    {
	if (!word) {
	    console.error("No word")
	    this.right = false
	    return
	}
	const len = word.length
	if (!coordinate) {
	    console.error("No coordinate")
	    this.right = false
	    return
	}
	const c = coordinate
	for (let j = 0; j < len; j++) {
	    if (c.dir === 'H') this.grid[c.x-c.i+j][c.y] = word[j]
	    else this.grid[c.x][c.y-c.i+j] = word[j]
	}
    }

    // TODO questo controlla se è la prima e chiama placeWord(nextWord)
    placeNextWord()
    {
	const word = this.nextWord.word
	if (!word) {
	    console.error("No word")
	    this.right = false
	    return
	}
	const len = word.length
	if (this.nextWord.first) {
	    //TODO this.placeWord(word, c) -> devo estrarre c da questo ammasso qua sotto
	    this.placeWord(word, this.nextWord.coordinate)
	    // for (let j = 0; j < len; j++) {
	    // 	if (this.first.h) this.grid[this.first.pos.x][this.first.pos.y+j] = answer[j]
	    // 	else this.grid[this.first.pos.x+j][this.first.pos.y] = answer[j]
	    // }
	} else {
	    const coordinate = this.nextWord.coordinate
	    if (!coordinate) {
		console.error("No coordinate")
		this.right = false
		return
	    }
	    this.placeWord(word, coordinate)
	}	
    }
    
    generateChildren(coordinates)
    {
	if (!coordinates) {
	    console.error("No coordinates")
	    this.right = false
	    return []
	}
	const children = []
	for (let i = 0; i < coordinates.length; i++) {
	    let c = coordinates[i]
	    if (c.h) {
		const new_c = {...c, dir: "H"}
		children.push(this.copy(new_c.word, new_c))
	    }
	    if (c.v) {
		const new_c = {...c, dir: "V"}
		children.push(this.copy(new_c.word, new_c))
	    }
	}
	console.log(children)
	return children
    }

    // TODO advance mette tutto insieme
    advance()
    {
	if (this.done || !this.right) {
	    console.log("Non dovresti essere qui")
	    return
	}
	console.log("Advancing")
	console.log("Placing next word")
	this.placeNextWord()
	console.log("Next word placed")
	if (this.words.length > 0) {
	    const newWord = this.words.shift()
	    console.log("Searching for coordinates for word:", newWord)
	    const coordinates = this.searchCoordinates(newWord)
	    console.log("Coordinates found")
	    const newCoordinate = coordinates.shift()
	    this.nextWord = {
		first: false,
		word: newWord,
		coordinate: newCoordinate
	    }
	    console.log("My next word will  be:", this.nextWord)
	    console.log("Generating children")
	    const children = this.generateChildren(coordinates)
	    console.log("Children generated")
	    crosswords.push(...children)
	} else {
	    console.log("Finito")
	    this.done = true
	}
    }

    canAddH(c)
    {
	const word = c.word
	if (c.i <= c.x && c.x + word.length - c.i <= this.w) {
	    let ok = true
	    let k = 0
	    console.log("H", word)
	    console.log(...word)
	    let p_before = []
	    let p_current = []
	    let p_after = []
	    while (ok && k < word.length) {
		let before = c.y > 0 ? this.grid[c.x-c.i+k][c.y-1] : '|'
		let current = this.grid[c.x-c.i+k][c.y]
		let after = c.y < this.w ? this.grid[c.x-c.i+k][c.y+1] : '|'
		p_before.push(before || "_")
		p_current.push(current || "_")
		p_after.push(after || "_")
		if (current !== word[k] && current !== "") {
		    //TODO questa condizione non funziona
		    // ||
		    // ((current === word[k] || current === "") &&
		    //  (before !== "" || before !== " " || after !== "" || after !== " ")))
		    ok = false
		    p_current.push("no")
		}
		k++
	    }
	    if (ok) p_current.push("sì")
	    console.log(...p_before)
	    console.log(...p_current)
	    console.log(...p_after)
	    return ok
	} else return false
    }

    canAddV(c)
    {
	const word = c.word
	if (c.i <= c.y && c.y + word.length - c.i <= this.w) {
	    let ok = true
	    let k = 0
	    // se c'è un vuoto, ma le lettere intorno sono già state messe, allora non può starci, altrimenti sì
	    // se c'è una lettera ...TODO
	    console.log("V", word)
	    while (ok && k < word.length) {
		let before = c.x > 0 ? this.grid[c.x-1][c.y-c.i+k] : '|'
		let current = this.grid[c.x][c.y-c.i+k]
		let after = c.x < this.w ? this.grid[c.x+1][c.y-c.i+k] : '|'
		if (current !== word[k] && current !== "")
		    // ||
		    // ((current === word[k] || current === "") &&
		    // (before !== "" || before !== " " || after !== "" || after !== " ")))
		    ok = false
		let p_before  = before  || "_"
		let p_current = current || "_"
		let p_after   = after   || "_"
		let p_letter = word[k]
		console.log(word[k]+": ", p_before, p_current, p_after)
		k++;
	    }
	    console.log(ok ? "sì" : "no")
	    return ok
	} else return false
    }

    shuffleWords()
    {
	for (let i = this.words.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.words[i], this.words[j]] = [this.words[j], this.words[i]];
	}
    }

    evaluateScore()
    {
	console.log("Calculating score:")
	if (!this.done || !this.right) return -1
	let rows = { begin: -1, end: -1, val: 0 }
	let i = 0
	while (rows.begin === -1 && i < this.w) {
	    let j = 0
	    while (rows.begin === -1 && j < this.w) {
		if (this.grid[i][j] !== "")
		    rows.begin = i
		j++
	    }
	    i++
	}
	i = this.w-1
	while (rows.end === -1 && i >= 0) {
	    let j = 0
	    while (rows.end === -1 && j < this.w) {
		if (this.grid[i][j] !== "")
		    rows.end = i
		j++
	    }
	    i--
	}
	let cols = { begin: -1, end: -1, val: -1 }
	i = 0
	while (cols.begin === -1 && i < this.w) {
	    let j = 0
	    while (cols.begin === -1 && j < this.w) {
		if (this.grid[j][i] !== "")
		    cols.begin = i
		j++
	    }
	    i++
	}
	i = this.w-1
	while (cols.end === -1 && i >= 0) {
	    let j = 0
	    while (cols.end === -1 && j < this.w) {
		if (this.grid[j][i] !== "")
		    cols.end = i
		j++
	    }
	    i--
	}
	rows.val = rows.end - rows.begin + 1
	cols.val = cols.end - cols.begin + 1
	let sizeRatio
	if (rows.val > cols.val) sizeRatio = cols.val / rows.val
	else sizeRatio = rows.val / cols.val
	//console.log("rows:", rows)
	//console.log("cols:", cols)
	console.log("size ratio:", sizeRatio)

	let filled = 0
	let empty = 0
	for (let i = rows.begin; i < rows.end+1; i++) {
	    for (let j = cols.begin; j < cols.end+1; j++) {
		if (this.grid[i][j] === "") empty++
		else filled++
	    }
	}
	//console.log("filled:", filled)
	//console.log("empty:", empty)
	//console.log("total:", filled+empty, "|", cols.val*rows.val)
	let filledRatio = filled / empty
	console.assert(filled+empty === rows.val*cols.val, "Nuh-huh!")
	console.log("filled ratio:", filledRatio)

 	this.score = (sizeRatio * 10) + (filledRatio * 20)
	console.log("final score:", this.score)
    }

}
