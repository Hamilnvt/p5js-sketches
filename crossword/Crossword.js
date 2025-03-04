const WIDTH = 61 
const HORIZONTAL = "H"
const VERTICAL = "V"
const SHUFFLE = true

//[TODO]
// - trasferire copy nel constructor e mettere degli argomenti adeguati
// - ottimizzazione: tenere un array di lettere già posizionate e scorrere quello invece di tutta la griglia

class Crossword
{
    constructor(words, direction, shuffle)
    {
        this.words = []
        this.letters = []
        this.initialWords = []
        for (let i = 0; i < words.length; i++) {
            this.words.push(words[i])
            this.initialWords.push(words[i])
        }
        if (shuffle) {
            this.shuffleWords()
            console.log("Initial Words:", this.words)
        }
        const word = this.words.shift()
        const len = word.length
        const spaces = floor((WIDTH-len)/2)
        const initial_i = direction === 'H' ? floor(WIDTH/2) : spaces
        const initial_j = direction === 'H' ? spaces : floor(WIDTH/2)
        this.nextWord = {
            first: true,
            word,
            coordinate: {
          letter_index: 0,
          i: initial_i,
          j: initial_j,
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
      //console.log("Creating new crossword"), coordinate)
      const crossword = new Crossword(this.initialWords, coordinate.dir)
      crossword.words = []
      for (let w of this.words) crossword.words.push(w)
      crossword.letters = []
      for (let lt of this.letters) crossword.letters.push(lt)
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
          if (this.grid[i][j]) rect(j*this.cell_dim.x, i*this.cell_dim.y, this.cell_dim.x, this.cell_dim.y)
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
        console.error("No word provided: crossword is not valid")
        return []
      }
      if (word === this.nextWord.word) {
        //console.log(word+" è la prima parola, verrà sempre messa al centro")
        return []
      }
      let coordinates = []
      //TODO:
      // - controlla quali coordinate sono valide
      //   > bisogna saltare uno spazio quando si vuole inserire una parola per evitare che
      //     si appiccichino due parole
      const len = word.length
      for (let i = 0; i < len; i++) {
        for (let l_i = 0; l_i < this.letters.length; l_i++) {
          const letter = this.letters[l_i]
          if (this.grid[letter.i][letter.j] === word[i]) {
            const c = {
              word,
              letter_index: i,
              i: letter.i,
              j: letter.j,
            }
            c.h = this.canAddH(c)
            c.v = this.canAddV(c)
            if (c.h || c.v) {
              coordinates.push(c)
            }
          }
        }
      }
      //console.log("Coordinates for "+word+"\n", coordinates)
      if (coordinates.length === 0) {
          console.log(word+" can't be added")
          this.right = false
      } //else console.log(word+" can be added")
      return coordinates
    }

    placeWord(word, coordinate)
    {
      if (!word) {
        console.error("No word")
        return
      }
      const len = word.length
      if (!coordinate) {
        console.error("No coordinate")
        return
      }
      const c = coordinate
      for (let k = 0; k < len; k++) {
        var l_i, l_j
        if (c.dir === 'H') {
          l_i = c.i
          l_j = c.j-c.letter_index+k
        }
        else {
          l_i = c.i-c.letter_index+k
          l_j = c.j
        }
        this.grid[l_i][l_j] = word[k]
        var letter = {
          char: word[k],
          i: l_i,
          j: l_j
        }
        var index = 0
        var found = false
        while (!found && index < this.letters.length) {
          if (this.letters[index].char === letter.char &&
              this.letters[index].i === letter.i &&
              this.letters[index].j === letter.j) found = true
          else index++
        }
        if (!found) this.letters.push(letter)
      }
    }

    placeNextWord()
    {
      //sono confuso da !word e !coordinate
      const word = this.nextWord.word
      if (!word) {
          //console.log("Ho perso le parole, ma va bene lo stesso", this)
          this.done = true
          return
      }
      if (this.nextWord.first) this.placeWord(word, this.nextWord.coordinate)
      else {
        const coordinate = this.nextWord.coordinate
        if (!coordinate) {
          //console.log("Ho perso le coordinate, ma va bene lo stesso", this)
          this.done = true
          return
        }
        this.placeWord(word, coordinate)
      }	
    }
    
    generateChildren(coordinates)
    {
      if (!coordinates) {
        console.error("No coordinates")
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
      return children
    }

    advance()
    {
      if (this.done || !this.right) {
        console.error("Non dovresti essere qui")
        return
      }
      this.placeNextWord()
      if (this.words.length > 0) {
        const newWord = this.words.shift()
        const coordinates = this.searchCoordinates(newWord)
        //const newCoordinate = coordinates.shift()
        //this.nextWord = {
        //  first: false,
        //  word: newWord,
        //  coordinate: newCoordinate
        //}
        var children = this.generateChildren(coordinates)
        if (children.length === 0) {
          this.done = true
        } else {
          children = children.slice(0, MAX_CHILDREN)
          if (newCrosswords.length < MAX_CROSSWORDS) newCrosswords.push(...children)
        }
      } else {
        //console.log("Finito")
        this.done = true
      }
    }

    // se c'è un vuoto, ma le lettere intorno sono già state messe, allora non può starci, altrimenti sì
    // se c'è una lettera ...TODO
    //TODO questa condizione non funziona
    // ||
    // ((current === word[k] || current === "") &&
    //  (before !== "" || before !== " " || after !== "" || after !== " ")))
    canAddV(c)
    {
      const word = c.word
      if (c.letter_index <= c.j && c.j + word.length - c.letter_index <= this.w) {
        let ok = true
        let k = 0
        //console.log(word, "V")
        while (ok && k < word.length) {
          let before = c.j > 0 ? this.grid[c.i-c.letter_index+k][c.j-1] : '|'
          let current = this.grid[c.i-c.letter_index+k][c.j]
          let after = c.j < this.w ? this.grid[c.i-c.letter_index+k][c.j+1] : '|'
          if (!(current === word[k] || current === "")) ok = false
          let p_before  = before  || "_"
          let p_current = current || "_"
          let p_after   = after   || "_"
          let p_letter = word[k]
          //console.log(word[k]+": ", p_before, p_current, p_after)
          k++
        }
        //console.log(ok ? "sì" : "no")
        return ok
      } else return false
    }

    canAddH(c)
    {
      const word = c.word
      if (c.letter_index <= c.j && c.j + word.length - c.letter_index <= this.w) {
        let ok = true
        let k = 0
        //console.log(...word, "H")
        const p_before = []
        const p_current = []
        const p_after = []
        while (ok && k < word.length) {
          let before = c.i > 0 ? this.grid[c.i-1][c.j-c.letter_index+k] : '|'
          let current = this.grid[c.i][c.j-c.letter_index+k]
          let after = c.i < this.w ? this.grid[c.i+1][c.j-c.letter_index+k] : '|'
          p_before.push(before || "_")
          p_current.push(current || "_")
          p_after.push(after || "_")
          if (!(current === word[k] || current === "")) {
            ok = false
            p_current.push("no")
          }
          k++;
        }
        if (ok) p_current.push("sì")
        //console.log(...p_before)
        //console.log(...p_current)
        //console.log(...p_after)
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
	//console.log("Calculating score:")
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
	//console.log("size ratio:", sizeRatio)

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
	//console.log("filled ratio:", filledRatio)

 	this.score = (sizeRatio * 10) + (filledRatio * 20)
	//console.log("final score:", this.score)
    }

}
