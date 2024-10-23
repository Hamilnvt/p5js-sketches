// Title: "slider"
// Created: mar 22 ott 2024, 13:20:43, CEST

var input_col

function setup()
{
    createCanvas(600, 600)
    input_col = document.getElementById("input_col")
    let chosen_col = document.getElementById("chosen_col")
    input_col.addEventListener("change", () => chosen_col.innerText = input_col.value)
    console.log(input_col.value)
}

function draw()
{
    background(30, 30, 30)

    for (let i = 0; i <= width; i++) {
	push()
	let col = map(i, 0, width, 0, 255)
	stroke([0, col, col, 255])
	line(i, 0, i, height)
	pop()
    }
}
