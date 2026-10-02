// Title: "digits"
// Created: gio 1 ott 2026, 21:36:01, CEST

// TODO:
// - draw vertical stick (in the comment)
// - fix small visual problem: the sticks should have the same dimension when selected and not
// - bottone per togliere tutti i segmenti

const STICK_WIDTH = 180
const STICK_HEIGHT = 45
const IS_VERTICAL = true

function is_mouse_on_rectangle(x, y, w, h) {
    return mouseX >= x
        && mouseX <= x + w
        && mouseY >= y
        && mouseY <= y + h
}

class Stick {

    /*

    (1)-------(2)
    /           \
  (6)           (3)
    \           /
    (5)-------(4)

*/

    constructor(x, y, is_vertical) {
        const w = STICK_WIDTH
        const h = STICK_HEIGHT

        this.is_vertical = is_vertical
        if (is_vertical) {
            this.v1 = createVector(x,       y)
            this.v2 = createVector(x,       y + w)
            this.v3 = createVector(x - h/2, y + w + h/2)
            this.v4 = createVector(x - h,   y + w)
            this.v5 = createVector(x - h,   y)
            this.v6 = createVector(x - h/2, y - h/2)
        } else {
            this.v1 = createVector(x,           y)
            this.v2 = createVector(x + w,       y)
            this.v3 = createVector(x + w + h/2, y + h/2)
            this.v4 = createVector(x + w,       y + h)
            this.v5 = createVector(x,           y + h)
            this.v6 = createVector(x - h/2,     y + h/2)
        }
        this.is_selected = false
    }

    draw() {
        push()
        if (this.is_selected) {
            noStroke()
            fill(0) 

            triangle(this.v1.x, this.v1.y, this.v5.x, this.v5.y, this.v6.x, this.v6.y)
            if (this.is_vertical) {
                rect(this.v5.x, this.v5.y, STICK_HEIGHT, STICK_WIDTH)
            } else {
                rect(this.v1.x, this.v1.y, STICK_WIDTH, STICK_HEIGHT)
            }
            triangle(this.v2.x, this.v2.y, this.v3.x, this.v3.y, this.v4.x, this.v4.y)
        } else {
            strokeWeight(5)

            line(this.v1.x, this.v1.y, this.v2.x, this.v2.y)
            line(this.v2.x, this.v2.y, this.v3.x, this.v3.y)
            line(this.v3.x, this.v3.y, this.v4.x, this.v4.y)
            line(this.v4.x, this.v4.y, this.v5.x, this.v5.y)    
            line(this.v5.x, this.v5.y, this.v6.x, this.v6.y)
            line(this.v6.x, this.v6.y, this.v1.x, this.v1.y)
        }
        pop()
    }

    is_hovered() {
        function is_mouse_on_triangle(x1, y1, x2, y2, x3, y3) {
            const d1 = (mouseX - x2) * (y1 - y2) - (x1 - x2) * (mouseY - y2);
            const d2 = (mouseX - x3) * (y2 - y3) - (x2 - x3) * (mouseY - y3);
            const d3 = (mouseX - x1) * (y3 - y1) - (x3 - x1) * (mouseY - y1);
            const hasNeg = d1 < 0 || d2 < 0 || d3 < 0;
            const hasPos = d1 > 0 || d2 > 0 || d3 > 0;
            return !(hasNeg && hasPos);
        }

        const t1 = is_mouse_on_triangle(this.v1.x, this.v1.y, this.v5.x, this.v5.y, this.v6.x, this.v6.y)
        const t2 = is_mouse_on_triangle(this.v2.x, this.v2.y, this.v3.x, this.v3.y, this.v4.x, this.v4.y)
        let r
        if (this.is_vertical) {
            r  = is_mouse_on_rectangle(this.v5.x, this.v5.y, STICK_HEIGHT, STICK_WIDTH)
        } else {    
            r  = is_mouse_on_rectangle(this.v1.x, this.v1.y, STICK_WIDTH, STICK_HEIGHT)
        }
        return t1 || t2 || r
    }
}

let sticks

function create_sticks_at(x, y) {
    sticks = [
        new Stick(x,                              y,                                !IS_VERTICAL),
        new Stick(x + STICK_WIDTH + STICK_HEIGHT, y + STICK_HEIGHT,                  IS_VERTICAL),
        new Stick(x + STICK_WIDTH + STICK_HEIGHT, y + 2*STICK_HEIGHT + STICK_WIDTH,  IS_VERTICAL),
        new Stick(x,                              y + 10*STICK_HEIGHT,              !IS_VERTICAL),
        new Stick(x,                              y + 2*STICK_HEIGHT + STICK_WIDTH,  IS_VERTICAL),
        new Stick(x,                              y + STICK_HEIGHT,                  IS_VERTICAL),
        new Stick(x,                              y + 5*STICK_HEIGHT,               !IS_VERTICAL)
    ]
}

const numbers = [
    [true,  true,  true,  true,  true,  true,  false],
    [false, true,  true,  false, false, false, false],
    [true,  true,  false, true,  true,  false, true],
    [true,  true,  true,  true,  false, false, true],
    [false, true,  true,  false, false, true,  true],
    [true,  false, true,  true,  false, true,  true],
    [true,  false, true,  true,  true,  true,  true],
    [true,  true,  true,  false, false, false, false],
    [true,  true,  true,  true,  true,  true,  true],
    [true,  true,  true,  true,  false, true,  true],
]

function set_sticks_to_number(n) {
    for (let b of position_buttons)
        b.is_on = false
    for (let i = 0; i < sticks.length; i++) {
        sticks[i].is_selected = numbers[n][i]
        position_buttons[i].is_on = numbers[n][i]
    }
}

const BUTTON_WIDTH = 75
const BUTTON_HEIGHT = 50
let number_buttons
let position_buttons

function get_selected_number() {
    for (let b of number_buttons) {
        if (b.is_on) return int(b.label)
    }
    return -1
}

function get_selected_position() {
    for (let i in position_buttons) {
        if (position_buttons[i].is_on) return i
    }
    return -1
}

let check_button

const RESULT_CORRECT   = 1
const RESULT_INFO      = 0
const RESULT_INCORRECT = -1
let checked_result = {
    text: "",
    value: RESULT_INFO
}

function check() {
    const selected_number = get_selected_number()
    if (selected_number == -1) {
        checked_result.value = RESULT_INFO
        checked_result.text = "Seleziona un numero, imposta i segmenti giusti e controlla di nuovo"
        return
    }
    let ok = true
    for (let i = 0; i < sticks.length; i++) {
        if (sticks[i].is_selected != numbers[selected_number][i]) {
            ok = false
            break
        }
    }
    if (ok) {
        checked_result.value = RESULT_CORRECT
        checked_result.text = `${selected_number}, esatto!`
    } else {
        checked_result.value = RESULT_INCORRECT
        let written_number = -1
        for (let i in numbers) {
            const n = numbers[i]
            let ok = true
            for (let j = 0; j < sticks.length; j++) {
                if (sticks[j].is_selected != n[j]) {
                    ok = false
                    break
                }
            }
            if (ok) {
                written_number = i
                break
            }
        }
        checked_result.text = `No, questo non è ${selected_number}` + ((written_number !== -1) ? `, ma è ${written_number}` : "")
    }
}

const MODE_LEARN = 0
const MODE_CHECK = 1
let mode = MODE_LEARN
let learn_mode_button 
let check_mode_button 

class Button {
    constructor(x, y, label) {
        this.x = x
        this.y = y
        this.w = BUTTON_WIDTH
        this.h = BUTTON_HEIGHT
        this.label = label
        this.is_on = false
    }

    is_hovered() { return is_mouse_on_rectangle(this.x, this.y, this.w, this.h) }

    draw() {
        push()
        noFill()

        let stroke_weight = 2
        if (this.is_hovered()) stroke_weight = 6
        if (this.is_on) {
            stroke_weight = 4
            stroke(0, 180, 0)
        }
        strokeWeight(stroke_weight)
        rect(this.x, this.y, this.w, this.h)

        fill(0)
        textSize(20)
        stroke(0)
        strokeWeight(1)
        text(this.label, this.x + this.w/2.5, this.y + this.h/1.5)

        pop()
    }
}

function create_number_buttons() {
    number_buttons = []
    for (let i = 0; i <= 9; i++) {
        number_buttons.push(new Button(500, 100+i*BUTTON_HEIGHT, String(i)))
    }
}

function create_position_buttons() {
    position_buttons = []
    const x = 650
    const y = 100
    const positions = [
        "Alto",
        "Alto-Destra",
        "Basso-Destra",
        "Basso",
        "Basso-Sinistra",
        "Alto-Sinistra",
        "Centro"
    ]
    for (let i in positions) {
        const p = positions[i]
        position_buttons.push(new Button(x, y+i*BUTTON_HEIGHT, p))
    }
}

function setup() {
    createCanvas(windowWidth, windowHeight)

    create_sticks_at(100, 25)
    create_number_buttons()
    create_position_buttons()

    check_button      = new Button(500, 100+(number_buttons.length+1)*BUTTON_HEIGHT, "Controlla")
    learn_mode_button  = new Button(800, 100, "Impara")
    check_mode_button = new Button(800, 200, "Controlla")

    learn_mode_button.is_on = true
}

function draw() {
    background(220)

    for (let stick of sticks) {
        stick.draw()
    }

    for (let button of number_buttons) {
        button.draw()
    }

    for (let button of position_buttons) {
        button.draw()
    }

    if (mode == MODE_CHECK) {
        check_button.draw()
    }
    learn_mode_button.draw()
    check_mode_button.draw()

    if (mode == MODE_CHECK) {
        if (checked_result.text) {
            push()
            noStroke()
            if (checked_result.value == RESULT_CORRECT) {
                fill(0, 180, 0)
            } else if (checked_result.value == RESULT_INFO) {
                fill(0)
            } else if (checked_result.value == RESULT_INCORRECT) {
                fill(180, 0, 0)
            }
            textSize(50)
            text(checked_result.text, 50, windowHeight-50)
            pop()
        }
    }
}

function mousePressed() {
    if (check_mode_button.is_hovered()) {
        mode = MODE_CHECK
        check_mode_button.is_on = true
        learn_mode_button.is_on = false
        checked_result.text = ""

        for (let stick of sticks)
            stick.is_selected = false

        for (let b of number_buttons)
            b.is_on = false

        for (let b of position_buttons)
            b.is_on = false
    } else if (learn_mode_button.is_hovered()) {
        mode = MODE_LEARN
        learn_mode_button.is_on = true
        check_mode_button.is_on = false

        for (let stick of sticks)
            stick.is_selected = false

        for (let b of number_buttons)
            b.is_on = false
    }

    if (mode == MODE_LEARN) {

        for (let button of number_buttons) {
            if (button.is_hovered()) {
                set_sticks_to_number(int(button.label))
                for (let b of number_buttons)
                    b.is_on = false
                button.is_on = true
            }
        }

        for (let i in position_buttons) {
            const button = position_buttons[i]
            if (button.is_hovered()) {
                sticks[i].is_selected = !sticks[i].is_selected
                button.is_on = !button.is_on
            }
        }

    } else if (mode == MODE_CHECK) {

        for (let button of number_buttons) {
            if (button.is_hovered()) {
                checked_result.text = ""
                for (let b of number_buttons)
                    b.is_on = false
                button.is_on = true
            }
        }

        for (let i in position_buttons) {
            const button = position_buttons[i]
            if (button.is_hovered()) {
                checked_result.text = ""
                sticks[i].is_selected = !sticks[i].is_selected
                button.is_on = !button.is_on
            }
        }

        for (let stick of sticks) {
            if (stick.is_hovered()) {
                stick.is_selected = !stick.is_selected
            }
        }

        if (check_button.is_hovered()) {
            check()        
        }

    }

}
