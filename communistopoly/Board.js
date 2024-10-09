const std_config = {
  w: 11,
  h: 11,
  cells: [
      ["START", "start"], ["City 1", "city"], ["Communism time", "communism"], ["City 2", "city"], ["TAX?", "tax"], ["Stazione 1", "stazione"], ["City 3", "city"], ["Chance", "chance"], ["City 4", "city"], ["City 5", "city"], ["Transito", "gulag"],
      ["City 6", "city"], ["Light company", "company"], ["City 7", "city"], ["City 8", "city"], ["Stazione 2", "stazione"], ["City 9", "city"], ["Communism time", "communism"], ["City 10", "city"], ["City 11", "city"],
      ["Transito 2", "gulag"], ["City 12", "city"], ["Chance", "chance"], ["City 13", "city"], ["City 14", "city"], ["Stazione 3", "stazione"], ["City 15", "city"], ["City 16", "city"], ["Acqua", "acqua"], ["City 17", "city"], ["Vai nel gulag", "gulag"],
      ["City 18", "city"], ["City 19", "city"], ["Communism time", "communism"], ["City 20", "city"], ["Stazione 4", "stazione"], ["Chance", "chance"], ["City 21", "city"], ["Tassa", "tax"], ["City 22", "city"]
  ]
};

class Board
{
  constructor(config)
  {
    this.w = config.w;
    this.h = config.h;

    this.cells = [];
    this.n_cells = config.cells.length;

    let total = 2*(this.w + this.h-2);
    if (this.n_cells !== total) {
      throw new Error(`Board is not well configured: dimensional error.\nDimensions: (${this.w}, ${this.h})\nThere must be a total of ${total} cells, but there are ${this.n_cells} instead.`);
    }

    const cell_w = width / this.w;
    const cell_h = height / this.h;
    let x = width - cell_w/2;
    let y = height - cell_h/2;
    let cell_index = 0;
    for (let i = 0; i < this.w; i++) {
      if (i !== 0) x -= cell_w;
      let c = this.dispatch_cell(x, y, cell_w, cell_h, config.cells[cell_index][0], config.cells[cell_index][1]);
      this.cells.push(c);
      cell_index++;
    }
    for (let i = 0; i < this.h-2; i++) {
      y -= cell_h;
      let c = this.dispatch_cell(x, y, cell_w, cell_h, config.cells[cell_index], config.cells[cell_index][1]);
      this.cells.push(c);
      cell_index++;
    }
    y -= cell_h;
    for (let i = 0; i < this.w; i++) {
      if (i !== 0) x += cell_w;
      let c = this.dispatch_cell(x, y, cell_w, cell_h, config.cells[cell_index][0], config.cells[cell_index][1]);
      this.cells.push(c);
      cell_index++;
    }
    for (let i = 0; i < this.h-2; i++) {
      y += cell_h;
      let c = this.dispatch_cell(x, y, cell_w, cell_h, config.cells[cell_index][0], config.cells[cell_index][1]);
      this.cells.push(c);
      cell_index++;
    }
  }

  show()
  {
    for (let c of this.cells) {
      c.show();
    }
  }

  dispatch_cell(x, y, w, h, name, type)
  {
    switch(type) {

      case("start"): return new Cell_Start(x, y, w, h, name);
      case("communism"): return new Cell_Communism(x, y, w, h, name);
      case("gulag"): return new Cell_Gulag(x, y, w, h, name);
      
      default: return new Cell(x, y, w, h, name);
    }
  }
}
