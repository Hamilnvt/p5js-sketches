// Title: "monsters_lab"
// Created: mer 11 dic 2024, 18:56:23, CET

var dice = [0, 0, 0, 0]
function throw_die(faces)
{
    return floor(random(faces))
}

const factories = [
    {colore: "blu", direzione: "sinistra"},
    {colore: "blu", direzione: "destra"},
    {colore: "rosso", direzione: "sinistra"},
    {colore: "rosso", direzione: "destra"},
    {colore: "giallo", direzione: "sinistra"},
    {colore: "giallo", direzione: "destra"},
]
const specie = ["lumaca", "fantasma"]
const colore = ["blue e viola", "verde e rosso"]
const pattern = ["pois", "strisce"]

var mostro = {
    specie: "",
    colore: "",
    pattern: ""
}

function creaMostro() {
    dice[0] = throw_die(factories.length)
    dice[1] = throw_die(specie.length)
    dice[2] = throw_die(colore.length)
    dice[3] = throw_die(pattern.length)
    mostro = {
	specie: specie[dice[1]],
	colore: colore[dice[2]],
	pattern: pattern[dice[3]]
    }
    console.log(mostro)
}

function generaCarte()
{
    
}

var carte = []

function setup()
{
    createCanvas(600, 600)
    generaCarte()
    creaMostro()
}

function draw()
{
    background(18)
}
