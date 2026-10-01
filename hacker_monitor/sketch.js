// Title: "hacker_monitor"
// Created: ven 27 giu 2025, 11:54:00, CEST

const ALL_CHARS = [
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&",
    "人口山水火日月木土金雨风鸟鱼马车手足心口目耳口田石竹花草云天电书学车鱼鸟马牛羊狗猫虫鱼火水土风云日月星山林田石竹花草あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをんアイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン"
]

const LATIN_CHARS = 0;
const JAPAN_CHARS = 1;
const CHARS_SETS_COUNT = ALL_CHARS.length;

const N = 20;

const rand_char = set => ALL_CHARS[set][Math.floor(Math.random() * ALL_CHARS[set].length)];
function rand_str(set, n)
{
    let s = [];
    for (let i = 0; i < n; i++) {
        s.push(rand_char(set));
    }
    return s;
}

const FLINES_COUNT = 120;
const MIN_SIZE = 50;
const MAX_SIZE = 10;

class FallingLine
{
    constructor(x, y, chars, size, speed)
    {
        this.pos = createVector(x, y);
        this.chars = chars;
        this.size = size;
        this.life = map(size, MIN_SIZE, MAX_SIZE, 0, 255);
        this.speed = speed;
        this.advancement = 0;
        this.i = 0;
    }
}

function rand_fline()
{
    return new FallingLine(random(width), random(-height/5, height/2),
                           rand_str(Math.floor(random(CHARS_SETS_COUNT)), N),
                           random(MIN_SIZE, MAX_SIZE), random(0.1, 1)
    );
}

let flines = [];

function setup()
{
    createCanvas(windowWidth, windowHeight);

    for (let i = 0; i < FLINES_COUNT; i++) {
        flines.push(rand_fline());
    }
}

function draw()
{
    background(0, 10, 10);

    for (let fi = 0; fi < flines.length; fi++) {
        fline = flines[fi];
        fline.advancement += fline.speed * deltaTime;
        if (fline.advancement > 70) { // TODO: cambiare questo numero
            fline.advancement = 0;
            if (fline.i < fline.chars.length) fline.i++;
        }
        push();
        textSize(fline.size);
        fill(0, 255, 0, fline.life);
        noStroke();
        textAlign(CENTER);
        strokeWeight(4);
        for (let i = 0; i < fline.i; i++) {
            text(fline.chars[i], fline.pos.x, fline.pos.y+fline.size*i);
        }
        pop();
        fline.life -= 1; // TODO: cambiare questo numero
        if (fline.life <= 0) flines[fi] = rand_fline();
    }
}
